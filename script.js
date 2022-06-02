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

// main button

const mainbtns=document.querySelectorAll(".main-btn");
mainbtns.forEach((btn)=>{
    let ripple;
    btn.addEventListener("mouseenter",(e)=>{
        const left=e.clientX - e.target.getBoundingClientRect().left;
        const top=e.clientY - e.target.getBoundingClientRect().top;
    
        ripple = document.createElement("div");
        ripple.classList.add("ripple");
        ripple.style.left=`${left}px`;
        ripple.style.top=`${top}px`;
        btn.prepend(ripple);
    });
    btn.addEventListener("mouseleave",()=>{
        btn.removeChild(ripple);
    })
})

// end of main button

// about me text
const aboutme = document.querySelector(".about-me-text");
const write= "I am a Computer Science student at Ho Chi Minh city University of Technology & I am really into tech stuff and willing to learn more.";
Array.from(write).forEach((char)=>{
    const span=document.createElement("span")
    span.textContent=char;
    aboutme.appendChild(span);
    span.addEventListener("mouseenter",(e)=>{
        e.target.style.animation="aboutmeanim 12s infinite";
    })
});

// end of about me text

// projects
const container = document.querySelector(".container");
const projects=document.querySelectorAll(".project");
projects.forEach((project)=>{
    project.addEventListener("mouseenter",()=>{
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight-project.offsetHeight + 20}px`;
    });
    project.addEventListener("mouseleave",()=>{
        project.firstElementChild.style.top=`2rem`;
    })
    // big project image
    project.addEventListener("click",()=>{
        const wrapper = document.createElement("div");
        wrapper.className="proj-img-wrapper";
        container.appendChild(wrapper);
    });
    // end of big project image
});

// end of projects