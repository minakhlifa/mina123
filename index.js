
var addBtn = document.querySelector('#addBtn');
var siteNameInput = document.querySelector('#siteName');
var siteUrlInput = document.querySelector('#siteUrl');
var updateBtn = document.querySelector('#updateBtn');
var searchInput = document.querySelector('#searchInput');
var fixedBox = document.querySelector('#fixedBox')
var closeBtn = document.querySelector('.close-icon')
console.log(addBtn)

var bookmarkList=[]
 
if(localStorage.getItem('bookmarks')!=null){
  bookmarkList = JSON.parse(localStorage.getItem('bookmarks'))
  displayData(bookmarkList)
}




addBtn.addEventListener('click',function addBookmark(){
  var bookmarkObj={
    siteName:siteNameInput.value,
    siteUrl:siteUrlInput.value
  }
  if(validation(siteNameInput.id,siteNameInput.value)==true&&validation(siteUrlInput.id,siteUrlInput.value)==true&&preventDuplication(bookmarkList,bookmarkObj)==true){
    bookmarkList.push(bookmarkObj)
    Swal.fire({
      icon: "success",
      title: "bookmark added",
      text: "Something went wrong!",
    });
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkList))
    console.log(bookmarkList)
    displayData(bookmarkList)
    clear()
  }
  else{
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
  

})

closeBtn.addEventListener('click',function(){
  fixedBox.classList.replace('d-flex','d-none')
})

function displayData(arr){
  var cartoona =''
  for(var i=0;i<arr.length;i++){
    cartoona +=`
    <tr>
        <td>${i+1}</td>
        <td class="text-capitalize">${arr[i].siteName}</td>
        <td><button class="btn btn-primary m-1 p-2" onclick="updateBookmark(${i})"><i class="fa fa-edit pe-2"></i>Update</button></td>
        <td><a class="btn btn-visit m-1 p-2" href=${arr[i].siteUrl} target =_blank><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn btn-delete m-1 p-2" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`
  }
  document.getElementById('bookmark-content').innerHTML = cartoona
}

var updatedindex;
function updateBookmark(index){
  updatedindex = index
siteNameInput.value = bookmarkList[index].siteName
siteUrlInput.value = bookmarkList[index].siteUrl;
addBtn.classList.add('d-none');
updateBtn.classList.remove('d-none')

}

updateBtn.addEventListener('click',function(){
  bookmarkList[updatedindex].siteName = siteNameInput.value;
  bookmarkList[updatedindex].siteUrl =siteUrlInput.value;
  displayData(bookmarkList)
  localStorage.setItem('bookmarks',JSON.stringify(bookmarkList))
  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
  clear()
})

function deleteBookmark(index){
bookmarkList.splice(index,1)
displayData(bookmarkList)
localStorage.setItem('bookmarks',JSON.stringify(bookmarkList))
}
function clear(){
  siteNameInput.value=''
  siteUrlInput.value=''
  siteNameInput.classList.remove('is-valid')
  siteUrlInput.classList.remove('is-valid')
}




var selectedInput = document.querySelectorAll('.selectedInput');
console.log(selectedInput)

for(var i=0;i<selectedInput.length;i++){
  selectedInput[i].addEventListener(('input'),function(e){
   var inputId = e.target.id
   var inputVal =e.target.value
   validation(inputId,inputVal)
  })
}

function validation(id,value){
var regex = {
  siteName:/^[a-z]{3,15}/i,
  siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
}
var element = document.getElementById(id) 
var errorMsg = document.getElementById(id+'Error')
if(regex[id].test(value)==true){  
console.log('match')
element.classList.add('is-valid');
element.classList.remove('is-invalid');
errorMsg.innerHTML=''
return true;
}
else{
  console.log('no match')
  element.classList.add('is-invalid');
  element.classList.remove('is-valid');
  errorMsg.innerHTML=(id=='siteName')?'Site name must contain at least 3 characters':'Site URL must be a valid one'
  return false;
}
}

function preventDuplication(arr,newObj){
for(var i=0;i<arr.length;i++){
  if(arr[i].siteName==newObj.siteName||arr[i].siteUrl==newObj.siteUrl){  

    return false;
  }
  
}
return true
}


