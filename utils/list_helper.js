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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
