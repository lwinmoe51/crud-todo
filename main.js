let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("button clicked");

    formvalidation();

});

//accessing input data
let data = {};
let acceptData = () => {
    data["text"] = input.value;
    console.log(data);
    createPost();
};

let formvalidation = () => {
    if (input.value === ""){
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    }else{
        console.log("success");
        msg.innerHTML = "";
        acceptData();
    }
}

let createPost = () => {
    // this keyword refer to the element that fired the event. in this case delete button
    posts.innerHTML += `
    <div>
        <p>${data.text}</p>
        <span class="options">
            <i onclick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
    `;
    input.value = "";
}

let deletePost = (e) => {
    //e will be the delete button which click
    //we will creat all post block element(div)
    //e first parent is span. span's parent is div. that why call two time parentELement
    e.parentElement.parentElement.remove();
};

let editPost = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
};