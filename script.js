const mousecir=document.querySelector(".mouse-circle");
const mousedot=document.querySelector(".mouse-dot");

// mouse circle
const mouscirfn=(x,y)=>{
    mousecir.style.cssText = `top:${y}px;left:${x}px;opacity: 1`;
    mousedot.style.cssText = `top:${y}px;left:${x}px;opacity: 1`;

};

// end of mouse circle

// animated circle
const circles = document.querySelectorAll(".circle");
const mainimg = document.querySelector(".main-circle img");
let mx=0;
let my=0;
const animatedcir=(e,x,y)=>{
    if(x<mx){
        circles.forEach((circle)=>{
            circle.style.left=`100px`;
        });
        mainimg.style.left=`100px`;  
    }else if(x>mx){
        circles.forEach((circle)=>{
            circle.style.left=`-100px`;
        });
        mainimg.style.left=`-100px`;
    }
   
    if(y<my){
        circles.forEach((circle)=>{
            circle.style.top=`100px`;
        });
        mainimg.style.top=`100px`;
    }else if(y>my){
        circles.forEach((circle)=>{
            circle.style.top=`-100px`;
        });
        mainimg.style.top=`-100px`;
    }
    mx=e.clientX;
    my=e.clientY;
};
// end of animated circle

document.body.addEventListener("mousemove",(e)=>{
    let x = e.clientX;
    let y = e.clientY;
    mouscirfn(x,y);
    animatedcir(e,x,y)
} );

document.body.addEventListener("mouseleave",()=>{
    mousecir.style.opacity="0";
    mousedot.style.opacity="0";
} );