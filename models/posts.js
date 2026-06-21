let posts = [];

function getPosts() {
  return posts;
}

function addPost(title, content) {
  const post = { id: posts.length + 1, title, content };
  posts.push(post);
  return post;
}

function updatePost(id, title, content) {
  const post = posts.find(p => p.id === id);
  if (!post) return null;
  post.title = title || post.title;
  post.content = content || post.content;
  return post;
}

function deletePost(id) {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  return posts.splice(index, 1)[0];
}

module.exports = { getPosts, addPost, updatePost, deletePost };

