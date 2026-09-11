import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";

/* =========================================================
   API CONFIG
========================================================= */

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_STATS = {
  energyUsed: 0,
  energySaved: 0,
  carbonEmitted: 0,
  carbonSaved: 0,
  costSaved: 0,
  ecoScore: null,
  computerCount: 0,
  currentPower: 0,
  periodStart: null,
  periodEnd: null,
};

/* =========================================================
   PERIODS
========================================================= */

const PERIOD_LABELS = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "1y": "Last 1 Year",
};

/* =========================================================
   DEPARTMENTS
========================================================= */

const DEPARTMENTS = [
  {
    value: "all",
    label: "All Departments",
  },
  {
    value: "it",
    label: "IT",
  },
  {
    value: "computer-science",
    label: "Computer Science",
  },
  {
    value: "engineering",
    label: "Engineering",
  },
  {
    value: "administration",
    label: "Administration",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = (value, decimals = 2) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const escapeCsv = (value) => {
  const text = String(value ?? "");

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

/* =========================================================
   REPORT COMPONENT
========================================================= */

export default function Reports() {
  const [timeRange, setTimeRange] = useState("30d");

  const [department, setDepartment] = useState("all");

  const [reportStats, setReportStats] =
    useState(DEFAULT_STATS);

  const [recentReports, setRecentReports] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [generating, setGenerating] =
    useState(false);

  /* =======================================================
     GET TOKEN
  ======================================================= */

  const getToken = () => {
    return localStorage.getItem(
      "greencompute_token"
    );
  };

  /* =======================================================
     FETCH REPORT DATA
  ======================================================= */

  const fetchReportStats = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const params = new URLSearchParams({
        period: timeRange,
        department,
      });

      const url =
        `${API_BASE_URL}/reports/summary?${params.toString()}`;

      console.log(
        "Fetching report:",
        url
      );

      const response = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",

          Authorization:
            `Bearer ${token}`,
        },
      });

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let data;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const message =
          typeof data === "string"
            ? data
            : data?.detail ||
              data?.message ||
              "Failed to load report data.";

        throw new Error(
          `Report API failed: ${response.status} ${message}`
        );
      }

      console.log(
        "Report API response:",
        data
      );

      const normalizedStats = {
        energyUsed:
          Number(
            data?.energyUsed
          ) || 0,

        energySaved:
          Number(
            data?.energySaved
          ) || 0,

        carbonEmitted:
          Number(
            data?.carbonEmitted
          ) || 0,

        carbonSaved:
          Number(
            data?.carbonSaved
          ) || 0,

        costSaved:
          Number(
            data?.costSaved
          ) || 0,

        ecoScore:
          data?.ecoScore === null ||
          data?.ecoScore === undefined
            ? null
            : Number(
                data.ecoScore
              ),

        computerCount:
          Number(
            data?.computerCount
          ) || 0,

        currentPower:
          Number(
            data?.currentPower
          ) || 0,

        periodStart:
          data?.periodStart ||
          null,

        periodEnd:
          data?.periodEnd ||
          null,
      };

      setReportStats(
        normalizedStats
      );

      return normalizedStats;
    } catch (err) {
      console.error(
        "Failed to load report statistics:",
        err
      );

      const message =
        err?.message ||
        "Failed to load report data.";

      setError(message);

      setReportStats(
        DEFAULT_STATS
      );

      return DEFAULT_STATS;
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD DATA WHEN FILTER CHANGES
  ======================================================= */

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReportStats();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [
    timeRange,
    department,
  ]);

  /* =======================================================
     DEPARTMENT LABEL
  ======================================================= */

  const departmentLabel = useMemo(() => {
    const found =
      DEPARTMENTS.find(
        (item) =>
          item.value === department
      );

    return (
      found?.label ||
      department
    );
  }, [department]);

  /* =======================================================
     CURRENT PERIOD LABEL
  ======================================================= */

  const periodLabel =
    PERIOD_LABELS[timeRange] ||
    timeRange;

  /* =======================================================
     CREATE REPORT SNAPSHOT
  ======================================================= */

  const createReportSnapshot = (
    stats
  ) => {
    return {
      id:
        Date.now(),

      createdAt:
        new Date().toISOString(),

      period:
        timeRange,

      periodLabel,

      department,

      departmentLabel,

      stats: {
        ...stats,
      },
    };
  };

  /* =======================================================
     GENERATE REPORT
  ======================================================= */

  const handleGenerateReport =
    async () => {
      setGenerating(true);
      setError("");

      try {
        /*
         * Important:
         * fetchReportStats() returns fresh data.
         * We use that returned data instead of immediately
         * reading reportStats because React state updates
         * are asynchronous.
         */

        const freshStats =
          await fetchReportStats();

        const newReport =
          createReportSnapshot(
            freshStats
          );

        setRecentReports(
          (previous) => [
            newReport,
            ...previous,
          ]
        );

        generatePDF(
          newReport
        );
      } catch (err) {
        console.error(
          "Generate report error:",
          err
        );

        setError(
          err?.message ||
            "Could not generate report."
        );
      } finally {
        setGenerating(false);
      }
    };

  /* =======================================================
     GENERATE PDF
  ======================================================= */

  const generatePDF = (
    report
  ) => {
    const doc =
      new jsPDF();

    const stats =
      report.stats;

    let y = 20;

    doc.setFontSize(20);

    doc.text(
      "GreenCompute Sustainability Report",
      20,
      y
    );

    y += 12;

    doc.setFontSize(11);

    doc.text(
      `Period: ${report.periodLabel}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Department: ${report.departmentLabel}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Generated: ${formatDate(
        report.createdAt
      )}`,
      20,
      y
    );

    y += 15;

    doc.setFontSize(14);

    doc.text(
      "Report Summary",
      20,
      y
    );

    y += 10;

    doc.setFontSize(11);

    const rows = [
      [
        "Energy Used",
        `${formatNumber(
          stats.energyUsed
        )} kWh`,
      ],

      [
        "Energy Saved",
        `${formatNumber(
          stats.energySaved
        )} kWh`,
      ],

      [
        "Carbon Emitted",
        `${formatNumber(
          stats.carbonEmitted
        )} kg CO2`,
      ],

      [
        "Carbon Saved",
        `${formatNumber(
          stats.carbonSaved
        )} kg CO2`,
      ],

      [
        "Cost Saved",
        `₹${formatNumber(
          stats.costSaved
        )}`,
      ],

      [
        "Eco Score",
        stats.ecoScore === null
          ? "N/A"
          : formatNumber(
              stats.ecoScore
            ),
      ],

      [
        "Computers",
        String(
          stats.computerCount
        ),
      ],

      [
        "Current Power",
        `${formatNumber(
          stats.currentPower
        )} W`,
      ],
    ];

    rows.forEach(
      ([label, value]) => {
        doc.text(
          `${label}:`,
          20,
          y
        );

        doc.text(
          value,
          90,
          y
        );

        y += 8;
      }
    );

    y += 10;

    doc.setFontSize(9);

    doc.text(
      "Generated by GreenCompute.",
      20,
      y
    );

    const filename =
      `GreenCompute_Report_${report.period}_${Date.now()}.pdf`;

    doc.save(filename);
  };

  /* =======================================================
     DOWNLOAD CURRENT PDF
  ======================================================= */

  const handleDownloadPDF =
    () => {
      const report =
        createReportSnapshot(
          reportStats
        );

      generatePDF(
        report
      );
    };

  /* =======================================================
     DOWNLOAD CSV
  ======================================================= */

  const handleDownloadCSV =
    () => {
      const stats =
        reportStats;

      const rows = [
        [
          "Metric",
          "Value",
        ],

        [
          "Energy Used (kWh)",
          stats.energyUsed,
        ],

        [
          "Energy Saved (kWh)",
          stats.energySaved,
        ],

        [
          "Carbon Emitted (kg CO2)",
          stats.carbonEmitted,
        ],

        [
          "Carbon Saved (kg CO2)",
          stats.carbonSaved,
        ],

        [
          "Cost Saved (INR)",
          stats.costSaved,
        ],

        [
          "Eco Score",
          stats.ecoScore ??
            "N/A",
        ],

        [
          "Computer Count",
          stats.computerCount,
        ],

        [
          "Current Power (W)",
          stats.currentPower,
        ],

        [
          "Period",
          periodLabel,
        ],

        [
          "Department",
          departmentLabel,
        ],

        [
          "Period Start",
          stats.periodStart ||
            "",
        ],

        [
          "Period End",
          stats.periodEnd ||
            "",
        ],
      ];

      const csv = rows
        .map(
          (row) =>
            row
              .map(
                escapeCsv
              )
              .join(",")
        )
        .join("\n");

      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;",
          }
        );

      downloadBlob(
        blob,
        `GreenCompute_Report_${timeRange}.csv`
      );
    };

  /* =======================================================
     DELETE REPORT
  ======================================================= */

  const handleDeleteReport =
    (reportId) => {
      setRecentReports(
        (previous) =>
          previous.filter(
            (report) =>
              report.id !==
              reportId
          )
      );
    };

  /* =======================================================
     RETRY
  ======================================================= */

  const handleRetry =
    () => {
      fetchReportStats();
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          gap: "20px",
          flexWrap:
            "wrap",
          marginBottom:
            "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize:
                "32px",
              fontWeight:
                700,
            }}
          >
            Reports
          </h1>

          <p
            style={{
              marginTop:
                "8px",
              color:
                "#64748b",
            }}
          >
            Sustainability and
            energy performance
            reports
          </p>
        </div>

        <div
          style={{
            display:
              "flex",
            gap: "10px",
            flexWrap:
              "wrap",
          }}
        >
          <button
            type="button"
            onClick={
              handleDownloadCSV
            }
            disabled={loading}
            style={{
              padding:
                "10px 16px",
              border:
                "1px solid #cbd5e1",
              borderRadius:
                "8px",
              background:
                "#ffffff",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Download CSV
          </button>

          <button
            type="button"
            onClick={
              handleDownloadPDF
            }
            disabled={loading}
            style={{
              padding:
                "10px 16px",
              border:
                "none",
              borderRadius:
                "8px",
              background:
                "#16a34a",
              color:
                "#ffffff",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              fontWeight:
                600,
            }}
          >
            Download PDF
          </button>

          <button
            type="button"
            onClick={
              handleGenerateReport
            }
            disabled={
              loading ||
              generating
            }
            style={{
              padding:
                "10px 16px",
              border:
                "none",
              borderRadius:
                "8px",
              background:
                "#2563eb",
              color:
                "#ffffff",
              cursor:
                loading ||
                generating
                  ? "not-allowed"
                  : "pointer",
              fontWeight:
                600,
            }}
          >
            {generating
              ? "Generating..."
              : "Generate Report"}
          </button>
        </div>
      </div>

      {/* FILTERS */}

      <div
        style={{
          display:
            "flex",
          gap: "16px",
          flexWrap:
            "wrap",
          marginBottom:
            "24px",
          padding:
            "16px",
          border:
            "1px solid #e2e8f0",
          borderRadius:
            "12px",
          background:
            "#ffffff",
        }}
      >
        <div>
          <label
            style={{
              display:
                "block",
              marginBottom:
                "6px",
              fontSize:
                "14px",
              fontWeight:
                600,
            }}
          >
            Time Period
          </label>

          <select
            value={
              timeRange
            }
            onChange={(event) =>
              setTimeRange(
                event.target.value
              )
            }
            style={{
              minWidth:
                "180px",
              padding:
                "10px",
              border:
                "1px solid #cbd5e1",
              borderRadius:
                "8px",
              background:
                "#ffffff",
            }}
          >
            <option value="7d">
              Last 7 Days
            </option>

            <option value="30d">
              Last 30 Days
            </option>

            <option value="90d">
              Last 90 Days
            </option>

            <option value="1y">
              Last 1 Year
            </option>
          </select>
        </div>

        <div>
          <label
            style={{
              display:
                "block",
              marginBottom:
                "6px",
              fontSize:
                "14px",
              fontWeight:
                600,
            }}
          >
            Department
          </label>

          <select
            value={
              department
            }
            onChange={(event) =>
              setDepartment(
                event.target.value
              )
            }
            style={{
              minWidth:
                "220px",
              padding:
                "10px",
              border:
                "1px solid #cbd5e1",
              borderRadius:
                "8px",
              background:
                "#ffffff",
            }}
          >
            {DEPARTMENTS.map(
              (item) => (
                <option
                  key={
                    item.value
                  }
                  value={
                    item.value
                  }
                >
                  {item.label}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            marginBottom:
              "20px",
            padding:
              "16px",
            borderRadius:
              "10px",
            background:
              "#fef2f2",
            border:
              "1px solid #fecaca",
            color:
              "#b91c1c",
          }}
        >
          <strong>
            Could not load
            report data
          </strong>

          <div
            style={{
              marginTop:
                "6px",
            }}
          >
            {error}
          </div>

          <button
            type="button"
            onClick={
              handleRetry
            }
            style={{
              marginTop:
                "12px",
              padding:
                "8px 14px",
              border:
                "none",
              borderRadius:
                "6px",
              background:
                "#dc2626",
              color:
                "#ffffff",
              cursor:
                "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div
          style={{
            marginBottom:
              "20px",
            padding:
              "12px",
            textAlign:
              "center",
            color:
              "#64748b",
          }}
        >
          Loading report data...
        </div>
      )}

      {/* STAT CARDS */}

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom:
            "28px",
        }}
      >
        {/* ENERGY USED */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Energy Used
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
            }}
          >
            {formatNumber(
              reportStats.energyUsed
            )}{" "}
            kWh
          </div>
        </div>

        {/* ENERGY SAVED */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Energy Saved
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
              color:
                "#16a34a",
            }}
          >
            {formatNumber(
              reportStats.energySaved
            )}{" "}
            kWh
          </div>
        </div>

        {/* CARBON EMITTED */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Carbon Emitted
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
            }}
          >
            {formatNumber(
              reportStats.carbonEmitted
            )}{" "}
            kg
          </div>
        </div>

        {/* CARBON SAVED */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Carbon Saved
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
              color:
                "#16a34a",
            }}
          >
            {formatNumber(
              reportStats.carbonSaved
            )}{" "}
            kg
          </div>
        </div>

        {/* COST SAVED */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Cost Saved
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
              color:
                "#2563eb",
            }}
          >
            ₹
            {formatNumber(
              reportStats.costSaved
            )}
          </div>
        </div>

        {/* ECO SCORE */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Eco Score
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
            }}
          >
            {reportStats.ecoScore ===
            null
              ? "N/A"
              : formatNumber(
                  reportStats.ecoScore,
                  1
                )}
          </div>
        </div>

        {/* COMPUTERS */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Computers
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
            }}
          >
            {
              reportStats.computerCount
            }
          </div>
        </div>

        {/* CURRENT POWER */}

        <div
          style={{
            padding:
              "20px",
            borderRadius:
              "12px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Current Power
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "28px",
              fontWeight:
                700,
            }}
          >
            {formatNumber(
              reportStats.currentPower
            )}{" "}
            W
          </div>
        </div>
      </div>

      {/* PERIOD INFO */}

      <div
        style={{
          marginBottom:
            "28px",
          padding:
            "20px",
          borderRadius:
            "12px",
          background:
            "#f8fafc",
          border:
            "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            marginTop: 0,
          }}
        >
          Report Period
        </h2>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <strong>
              Period
            </strong>

            <div>
              {periodLabel}
            </div>
          </div>

          <div>
            <strong>
              Department
            </strong>

            <div>
              {departmentLabel}
            </div>
          </div>

          <div>
            <strong>
              Start
            </strong>

            <div>
              {formatDate(
                reportStats.periodStart
              )}
            </div>
          </div>

          <div>
            <strong>
              End
            </strong>

            <div>
              {formatDate(
                reportStats.periodEnd
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT REPORTS */}

      <div
        style={{
          padding:
            "20px",
          borderRadius:
            "12px",
          background:
            "#ffffff",
          border:
            "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            marginBottom:
              "16px",
          }}
        >
          <h2
            style={{
              margin: 0,
            }}
          >
            Recent Reports
          </h2>

          <span
            style={{
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            {
              recentReports.length
            }{" "}
            report
            {recentReports.length !==
            1
              ? "s"
              : ""}
          </span>
        </div>

        {recentReports.length ===
        0 ? (
          <div
            style={{
              padding:
                "30px",
              textAlign:
                "center",
              color:
                "#64748b",
            }}
          >
            No reports generated
            yet.
          </div>
        ) : (
          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              gap: "12px",
            }}
          >
            {recentReports.map(
              (report) => (
                <div
                  key={
                    report.id
                  }
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: "16px",
                    flexWrap:
                      "wrap",
                    padding:
                      "16px",
                    border:
                      "1px solid #e2e8f0",
                    borderRadius:
                      "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight:
                          600,
                      }}
                    >
                      {
                        report.periodLabel
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "14px",
                        color:
                          "#64748b",
                      }}
                    >
                      {
                        report.departmentLabel
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "13px",
                        color:
                          "#94a3b8",
                      }}
                    >
                      Generated{" "}
                      {formatDate(
                        report.createdAt
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "8px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        generatePDF(
                          report
                        )
                      }
                      style={{
                        padding:
                          "8px 12px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "6px",
                        background:
                          "#ffffff",
                        cursor:
                          "pointer",
                      }}
                    >
                      PDF
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteReport(
                          report.id
                        )
                      }
                      style={{
                        padding:
                          "8px 12px",
                        border:
                          "none",
                        borderRadius:
                          "6px",
                        background:
                          "#fee2e2",
                        color:
                          "#b91c1c",
                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}