let promise = () =>( 
 new Promise((res,rej) => {
  let bool = true;
  let numb = 23;
  if(bool){
    res(() => {
      return numb
    });
  }else{
    rej(console.log("err"))
  }  
}));

let result = promise().then((numb) => {
  console.log(numb())
}).catch((err) => {
  console.log(err);
})