const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return sum;
};

const favoriteBlog = (blogs) => {
  let highestLikeCount;

  blogs.forEach((element) => {
    if (!highestLikeCount) {
      highestLikeCount = element;
    } else if (element.likes > highestLikeCount.likes) {
      highestLikeCount = element;
    }
  });

  const outputObject = {
    title: highestLikeCount.title,
    author: highestLikeCount.author,
    likes: highestLikeCount.likes,
  };

  return outputObject;
};

const mostBlogs = (blogs) => {
  let mostAuthor = {};

  blogs.forEach((blog) => {
    if (mostAuthor[blog.author]) {
      mostAuthor[blog.author]++;
    } else {
      mostAuthor[blog.author] = 1;
    }
  });

  let maxKey = "";
  let maxValue = null;

  for (const key in mostAuthor) {
    if (maxValue === null || mostAuthor[key] > maxValue) {
      maxKey = key;
      maxValue = mostAuthor[key];
    }
  }

  return {
    author: `${maxKey}`,
    blogs: maxValue,
  };
};

const mostLikes = (blogs) => {
  let mostLikesAuthor = {
    author: "",
    likes: null,
  };
  blogs.forEach((blog) => {
    // console.log(blog);
    if (blog["likes"] > mostLikesAuthor["likes"]) {
      mostLikesAuthor["author"] = blog["author"];
      mostLikesAuthor["likes"] = blog["likes"];
    }
  });

  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
