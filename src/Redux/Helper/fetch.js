function checkHTTPStatus(status) {
  if (status === 401) {
    sessionStorage.setItem('sessionExpired', true);
  }
}

export const post = async (
  {
    url, success, failure, body, dispatch, setAuthToken,
  },
) => {
  let data;
  try {
    const customHeaders = {
      'Content-Type': 'application/json',
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: customHeaders,
      body: JSON.stringify(body),
    });
    data = await res.json();
    checkHTTPStatus(res.status);
    dispatch({ type: success, data });
  } catch (e) {
    if (failure) {
      dispatch({ type: failure, data });
    }
  }
};

export const get = async ({
  url, success, failure, dispatch, setAuthToken,
}) => {
  let data;
  try {

    const res = await fetch(url, {
      method: 'get',
    });
    data = await res.json();
    checkHTTPStatus(res.status);
    dispatch({ type: success, data });
  } catch (e) {
    if (failure) {
      dispatch({ type: failure, data });
    }
  }
};