import blogs from './blogs.json';

const get = (url, params) => {

   // if the url starts /api/course then a number return a random course from the courses.json file
    if (url.startsWith("/api/blogs/")) {
        const id = url.split("/").pop();
        const blog = blogs.find((blog) => blog.id === parseInt(id));
        return Promise.resolve({
            "data": blog,
        });
    }

  switch (url) {
    
    case "/api/blogs":
      
      return Promise.resolve({
        "data": blogs,
      });
    default:
      return Promise.resolve({ "data": [] });
  }
};

const post = (url, params) => {
    switch (url) {
        case "/api/login":
        return Promise.resolve({
            "data": {
                id: 1,
                email: params.email,
                token: "123456789",
            },
        });
        case "/api/signup":
        return Promise.resolve({
            "data": {
                id: 1,
                email: "admin@test.com",
                token: "123456789",
            },
        });
    }
};

const put = (url, params) => {
};

const mockAxios = {
  get,
  post,
  put,
  delete: () => {},
};
export default mockAxios;
