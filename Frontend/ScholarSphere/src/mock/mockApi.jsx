import courses from './courses.json';

const get = (url, params) => {

   // if the url starts /api/course then a number return a random course from the courses.json file
    if (url.startsWith("/api/courses/")) {
        const id = url.split("/").pop();
        const course = courses.find((course) => course.id === parseInt(id));
        return Promise.resolve({
            "data": course,
        });
    }

  switch (url) {
    
    case "/api/courses":
      
      return Promise.resolve({
        "data": courses,
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
                username: "admin",
                email: "admin@test.com",
                token: "123456789",
            },
        });
        case "/api/signup":
        return Promise.resolve({
            "data": {
                id: 1,
                username: "admin",
                email: "admin@test.com",
                token: "123456789",
            },
        });
    }
};

const put = (url, params) => {
    /*
  switch (url) {
    case "users/":
      return Promise.resolve({
        data: data.putUsersData,
      });
    case "https://api.github.com/users/fl1jason/followers":
      return Promise.resolve({
        data: data.getFollowersData,
      });
    default:
      return Promise.resolve({ data: [] });
  }*/
};

const mockAxios = {
  get,
  post,
  put,
  delete: () => {},
};
export default mockAxios;
