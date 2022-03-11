const request = async (url, options = {}) => {
  const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com'
  try {
      const res = await fetch(`${API_END_POINT}${url}`, options)

      if (!res.ok) {
          throw new Error(`ERROR: ${res.status}`)
      }

      return await res.json();
  } catch(e) {
      alert(e.message);
  };
};

export default request;