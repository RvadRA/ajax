

let posts = [];

function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

async function savePost() {
  const userId = document.getElementById('userId').value;
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  // Basic validation
  if (!userId || !title || !body) {
    alert('Please fill in all fields.');
    return;
  }

  const newPost = {
    userId: parseInt(userId),
    title: title,
    body: body,
  };

  // Use the JSONPlaceholder API to create a new post
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (response.ok) {
    // Parse the response to get the created post
    const createdPost = await response.json();

    // Add the created post to the posts array
    posts.push(createdPost);

    // Render the posts
    renderPosts();

    // Close the modal
    closeModal();
  } else {
    alert('Failed to create a new post.');
  }
}

async function deletePost(id) {
  // Use the JSONPlaceholder API to delete the post
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    // Remove the post from the array
    posts = posts.filter(post => post.id !== id);

    // Render the updated posts
    renderPosts();
  } else {
    alert('Failed to delete the post.');
  }
}

async function editPost(id) {
  // Use the JSONPlaceholder API to fetch the post data
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (response.ok) {
    // Parse the response to get the post data
    const postData = await response.json();

    // Fill the modal with the post data
    document.getElementById('userId').value = postData.userId;
    document.getElementById('title').value = postData.title;
    document.getElementById('body').value = postData.body;

    // Open the modal for editing
    openModal();

    // Remove the post from the array
    posts = posts.filter(post => post.id !== id);

    // Render the updated posts
    renderPosts();
  } else {
    alert('Failed to fetch post data for editing.');
  }
}

function renderPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <div class="post">
        <p>User ID: ${post.userId}</p>
        <p>Title: ${post.title}</p>
        <p>Body: ${post.body}</p>
        <button onclick="editPost(${post.id})">Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Fetch initial posts from the JSONPlaceholder API
async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (response.ok) {
    posts = await response.json();
    renderPosts();
  } else {
    alert('Failed to fetch posts.');
  }
}

// Fetch posts when the script is loaded
fetchPosts();
