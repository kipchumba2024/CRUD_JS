

// Fetch all posts
fetch('http://localhost:3000/posts')
  .then((res) => res.json())
  .then((data) => {

    
const posts_row = document.getElementById("posts_row")

for(post of data){
    posts_row.innerHTML += `
    <div class="col-md-3 mb-2">
    <div class="bg-light p-1 border">
      <img src=${post.imageUrl} class="img-fluid" />
      <h6 class="fw-bold">${post.title}</h6>
      <div class="row">
        <p class="col">${post.author}</p>
        <p class="col" >${post.date}</p>
      </div>
      <button onclick="deletePost('${(post.id)}')" class="btn btn-danger btn-sm">Delete</buton>
      <button onclick="editPost('${(post.id)}')" class="btn btn-success ms-4 btn-sm">Update</buton>

    </div>
    </div>
    `
}

  });


// Add Post
const add_form = document.getElementById("add_post_form");

add_form.addEventListener("submit", (event)=>{
        event.preventDefault();


      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const image = document.getElementById("imageUrl").value;
      const author = document.getElementById("author").value;
      const date = document.getElementById("date").value;


      fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          description: description,
          imageUrl: image,
          author: author,
          date: date,
          comments: []
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const message = document.getElementById("message");
          message.innerText = "Post created Successfully"

          
        });
  
})


// Delete post function
function deletePost(id){
 
  fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  })
  .then((res)=> res.json() )
  .then((response) =>{
          const message = document.getElementById("delete_message");
          message.innerText = "Post deleted Successfully"
  })
  
}


// Edit
function editPost(id)
{
  fetch(`http://localhost:3000/posts/${id}`)
  .then((res) => res.json())
  .then((data) => {

    const edit_container = document.getElementById("edit_container")

    edit_container.innerHTML = `
                   <h5>Edit Post</h5>
                <div id="message" class="text-success" role="alert">
                       <!-- This is where the success message will be displayed -->
                </div>
                <form id="add_post_form">
                  <div class="mb-3">
                    <input type="text" class="form-control" id="title" required placeholder="Title" >
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" id="imageUrl" required placeholder="Image URL" >
                  </div>
        
                  <div class="mb-3">
                    <input type="text" class="form-control" id="author" required placeholder="Author" >
                  </div>
        
                  <div class="mb-3">
                    <input type="date" class="form-control" id="date" required placeholder="Date" >
                  </div>
        
                  <div class="mb-3">
                    <textarea type="text" rows="4" placeholder="Description" class="form-control"  id="description"  > </textarea>
                  </div>
             
                
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
    
    `
      console.log(data);
      
  })
}