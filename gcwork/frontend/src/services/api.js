const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const TOKEN_KEY = "greencompute_token";

/*
 * Build complete API URL
 */
const buildUrl = (endpoint) => {
  const cleanBaseUrl =
    API_BASE_URL.replace(/\/+$/, "");

  const cleanEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  return `${cleanBaseUrl}${cleanEndpoint}`;
};

/*
 * Get authentication token
 */
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/*
 * Create request headers
 */
const getHeaders = (
  customHeaders = {},
  hasBody = false
) => {
  const headers = {
    Accept: "application/json",
    ...customHeaders,
  };

  if (hasBody) {
    headers["Content-Type"] =
      "application/json";
  }

  const token = getToken();

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return headers;
};

/*
 * Handle API response
 */
const handleResponse = async (
  response
) => {
  const contentType =
    response.headers.get(
      "content-type"
    );

  const data =
    contentType?.includes(
      "application/json"
    )
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    const error =
      new Error(message);

    error.status =
      response.status;

    error.data = data;

    throw error;
  }

  return data;
};

/*
 * Main API request function
 */
const request = async (
  endpoint,
  options = {}
) => {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
  } = options;

  const hasBody =
    body !== undefined &&
    body !== null;

  const requestOptions = {
    method,
    headers: getHeaders(
      headers,
      hasBody
    ),
    signal,
  };

  if (hasBody) {
    requestOptions.body =
      typeof body === "string"
        ? body
        : JSON.stringify(body);
  }

  try {
    const response =
      await fetch(
        buildUrl(endpoint),
        requestOptions
      );

    if (response.status === 401) {
      localStorage.removeItem(
        TOKEN_KEY
      );

      localStorage.removeItem(
        "greencompute_user"
      );
    }

    return await handleResponse(
      response
    );
  } catch (error) {
    if (
      error.name === "AbortError"
    ) {
      throw error;
    }

    console.error(
      "API Request Error:",
      {
        url: buildUrl(endpoint),
        message: error.message,
      }
    );

    throw error;
  }
};

/*
 * GET
 */
const get = (
  endpoint,
  options = {}
) => {
  return request(endpoint, {
    ...options,
    method: "GET",
  });
};

/*
 * POST
 */
const post = (
  endpoint,
  body = null,
  options = {}
) => {
  return request(endpoint, {
    ...options,
    method: "POST",
    body,
  });
};

/*
 * PUT
 */
const put = (
  endpoint,
  body = null,
  options = {}
) => {
  return request(endpoint, {
    ...options,
    method: "PUT",
    body,
  });
};

/*
 * PATCH
 */
const patch = (
  endpoint,
  body = null,
  options = {}
) => {
  return request(endpoint, {
    ...options,
    method: "PATCH",
    body,
  });
};

/*
 * DELETE
 */
const del = (
  endpoint,
  options = {}
) => {
  return request(endpoint, {
    ...options,
    method: "DELETE",
  });
};

/*
 * Upload file
 */
const upload = async (
  endpoint,
  formData,
  options = {}
) => {
  const token = getToken();

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  try {
    const response =
      await fetch(
        buildUrl(endpoint),
        {
          method:
            options.method || "POST",
          headers,
          body: formData,
          signal: options.signal,
        }
      );

    if (response.status === 401) {
      localStorage.removeItem(
        TOKEN_KEY
      );

      localStorage.removeItem(
        "greencompute_user"
      );
    }

    return await handleResponse(
      response
    );
  } catch (error) {
    if (
      error.name === "AbortError"
    ) {
      throw error;
    }

    console.error(
      "Upload Error:",
      error
    );

    throw error;
  }
};

/*
 * Backend health check
 */
const healthCheck = () => {
  return get("/health");
};

/*
 * API object
 */
const api = {
  request,
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  healthCheck,
  baseURL: API_BASE_URL,
};

export default api;