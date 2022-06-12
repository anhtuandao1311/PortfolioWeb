const mousecir=document.querySelector(".mouse-circle");
const mousedot=document.querySelector(".mouse-dot");

let mousecirclebool = true;
// mouse circle
const mouscirfn=(x,y)=>{
    if(mousecirclebool){
        mousecir.style.cssText = `top:${y}px;left:${x}px;opacity: 1`;
    }
    mousedot.style.cssText = `top:${y}px;left:${x}px;opacity: 1`;

};

// end of mouse circle

// animated circle
const circles = document.querySelectorAll(".circle");
const mainimg = document.querySelector(".main-circle img");
let mx=0;
let my=0;
const z = 100;
const animatedcir=(e,x,y)=>{
    if(x<mx){
        circles.forEach((circle)=>{
            circle.style.left=`${z}px`;
        });
        mainimg.style.left=`${z}px`;  
    }else if(x>mx){
        circles.forEach((circle)=>{
            circle.style.left=`-${z}px`;
        });
        mainimg.style.left=`-${z}px`;
    }
   
    if(y<my){
        circles.forEach((circle)=>{
            circle.style.top=`${z}px`;
        });
        mainimg.style.top=`${z}px`;
    }else if(y>my){
        circles.forEach((circle)=>{
            circle.style.top=`-${z}px`;
        });
        mainimg.style.top=`-${z}px`;
    }
    mx=e.clientX;
    my=e.clientY;
};
// end of animated circle


// sticky element

let hoveredeleposition = [];

const stickyele = (x,y,hoveredele) =>{
    if(hoveredele.classList.contains("sticky")){
        if(hoveredeleposition.length < 1){
            hoveredeleposition = [hoveredele.offsetTop,hoveredele.offsetLeft];
        }
        hoveredele.style.cssText = `top: ${y}px; left: ${x}px`;
        if(hoveredele.offsetTop <= hoveredeleposition[0]-100 || hoveredele.offsetTop >= hoveredeleposition[0]+100 || hoveredele.offsetLeft <= hoveredeleposition[1]-100 || hoveredele.offsetLeft >= hoveredeleposition[1]+100){
            hoveredele.style.cssText = "";
            hoveredeleposition=[];
        }
        hoveredele.onmouseleave = ()=>{
            hoveredele.style.cssText = "";
            hoveredeleposition=[];
        }
    }
}

// end of sticky element

// mouse circle transform
const mousecircletransform = (hoveredele)=>{
    if(hoveredele.classList.contains("pointer-enter")){
        hoveredele.onmousemove = ()=>{
            mousecirclebool=false;
            mousecir.style.cssText = `
            width: ${hoveredele.getBoundingClientRect().width}px; 
            height: ${hoveredele.getBoundingClientRect().height}px; 
            top: ${hoveredele.getBoundingClientRect().top}px; 
            left: ${hoveredele.getBoundingClientRect().left}px;
            opacity: 1;
            transform : translate(0,0);
            animation : none;
            border-radius: ${getComputedStyle(hoveredele).borderBottomLeftRadius};
            transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s;
            `;
        };
        hoveredele.onmouseleave = () => {
            mousecirclebool=true;
        };
        document.onscroll = () => {
            if(!mousecirclebool){
                mousecir.style.top=`${hoveredele.getBoundingClientRect().top}px`;
            }
        }
    };
};
// end of mouse circle transform

document.body.addEventListener("mousemove",(e)=>{
    let x = e.clientX;
    let y = e.clientY;
    mouscirfn(x,y);
    animatedcir(e,x,y);

    const hoveredele = document.elementFromPoint(x,y);
    stickyele(x,y,hoveredele);
    mousecircletransform(hoveredele);

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

// progress bar

const sections = document.querySelectorAll("section");
const progressbar = document.querySelector(".progress-bar");
const halfcircles = document.querySelectorAll(".half-circle");
const halfcircletop = document.querySelector(".half-circle-top");
const progressbarcircle = document.querySelector(".progress-bar-circle");

let scrolledportion = 0;
let scrollbool = false;
let imagewrapper = false;

const progressbarfn = (bigimgwrapper)=>{
    imagewrapper = bigimgwrapper;
    let pageheight = 0;
    const pageviewportheight= window.innerHeight;

    if(!imagewrapper){
        pageheight = document.documentElement.scrollHeight;
        scrolledportion = window.pageYOffset;
    }else{
        pageheight = imagewrapper.firstElementChild.scrollHeight;
        scrolledportion = imagewrapper.scrollTop;
    }

    
    const scrolledportiondegree = (scrolledportion/(pageheight - pageviewportheight))*360;
    halfcircles.forEach((ele)=>{
        ele.style.transform = `rotate(${scrolledportiondegree}deg)`;
        if(scrolledportiondegree>=180){
            halfcircles[0].style.transform = "rotate(180deg)";
            halfcircletop.style.opacity = "0";
        }else{
            halfcircletop.style.opacity = "1";
        }
    });
    scrollbool = scrolledportion + pageviewportheight === pageheight;

    // arrow rotation
    if(scrollbool)
    {
        progressbarcircle.style.transform = "rotate(180deg)";
    }else{
        progressbarcircle.style.transform = "rotate(0)";
    }
    // end of arrow rotation
};

// progress bar click
progressbar.onclick = (e)=>{
    e.preventDefault();

    if(!imagewrapper){
        const sectionpositions = Array.from(sections).map((section)=>
        scrolledportion+section.getBoundingClientRect().top
    );
    const position = sectionpositions.find((sectionposition)=>{
        return sectionposition>scrolledportion;
    });

    scrollbool ? window.scrollTo(0,0) : window.scrollTo(0,position);
    }else{
        scrollbool ? imagewrapper.scrollTo(0,0): imagewrapper.scrollTo(0,imagewrapper.scrollHeight);
    }

    
};
// end of progress bar click

progressbarfn();
// end of progress bar

// navigation
const menuicon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollfn = ()=> {
    menuicon.classList.add("show-menu-icon");
    navbar.classList.add("hide-navbar");
    if(window.scrollY===0){
        menuicon.classList.remove("show-menu-icon");
        navbar.classList.remove("hide-navbar");
    }

    progressbarfn();
}

document.addEventListener("scroll",scrollfn);

menuicon.addEventListener("click",()=>{
    menuicon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
})
// end of navigation

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
const projecthidebtn=document.querySelector(".project-hide-btn");
projects.forEach((project,i)=>{
    project.addEventListener("mouseenter",()=>{
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight-project.offsetHeight + 20}px`;
    });
    project.addEventListener("mouseleave",()=>{
        project.firstElementChild.style.top=`2rem`;
    })
    // big project image
    project.addEventListener("click",()=>{
        const wrapper = document.createElement("div");
        wrapper.className="project-img-wrapper";
        container.appendChild(wrapper);
        const bigimg=document.createElement("img");
        bigimg.className="project-img";
        const imgpath=project.firstElementChild.getAttribute("src").split(".")[0];

        bigimg.setAttribute("src",`${imgpath}-big.jpg`);
        wrapper.appendChild(bigimg);
        document.body.style.overflowY="hidden";

        document.removeEventListener("scroll",scrollfn);

        mousecir.style.opacity = 0;

        progressbarfn(wrapper);
        wrapper.onscroll = () =>{
            progressbarfn(wrapper);
        }

        projecthidebtn.classList.add("change");
        projecthidebtn.onclick = () => {
            projecthidebtn.classList.remove("change");
            wrapper.remove();
            document.body.style.overflowY="scroll";
            document.addEventListener("scroll",scrollfn);

            progressbarfn();
        }

    });
    // end of big project image
    i>=6&&(project.style.cssText="display:none; opacity:0")
});

// projects button
const section3=document.querySelector(".section-3");
const projectsbtn=document.querySelector(".projects-btn");
const projectsbtntext=document.querySelector(".projects-btn span");
let showhide=true;
const showproj=(project,i)=>{
    setTimeout(()=>{
        project.style.display="flex";
        section3.scrollIntoView({block:"end"});
    },600);
    setTimeout(()=>{
        project.style.opacity = "1";
    },i*200);
}
const hideproj=(project,i)=>{
    setTimeout(()=>{
        project.style.display="none";
        section3.scrollIntoView({block:"end"});
    },1200);
    setTimeout(()=>{
        project.style.opacity = "0";
    },i*100);
}
projectsbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    projectsbtn.firstElementChild.nextElementSibling.classList.toggle("change");
    showhide ?(projectsbtntext.textContent="Show less"):(projectsbtntext.textContent="Show more");
    projects.forEach((project,i)=>{
        i>=6 &&(showhide?showproj(project,i):hideproj(project,i));
    });
    showhide = !showhide;
})

// end of projects button

// end of projects

// section 4
document.querySelectorAll(".service-btn").forEach((service)=>{
    service.addEventListener("click",(e)=>{
        e.preventDefault();

        const servicetext=service.nextElementSibling;
        servicetext.classList.toggle("change");

        const rightposition = servicetext.classList.contains("change") ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0;
        service.firstElementChild.style.        right=rightposition;
    });
});
// end of section 4

// section 5
// form
const formheading = document.querySelector(".form-heading");
const forminputs = document.querySelectorAll(".contact-form-input");
forminputs.forEach((input)=>{
    input.addEventListener("focus",()=>{
    formheading.style.opacity="0";
    setTimeout(()=>{
        formheading.textContent=`Your ${input.placeholder}`;
        formheading.style.opacity="1";
        },300);
    });

    input.addEventListener("blur",()=>{
        formheading.style.opacity="0";
        setTimeout(()=>{
            formheading.textContent="Let's Talk";
            formheading.style.opacity="1";
            },300);
        });
});

// end of form

// slideshow
const slideshow = document.querySelector(".slideshow");
setInterval(()=>{
    const firsticon = slideshow.firstElementChild;
    firsticon.classList.add("faded-out");
    const thirdicon = slideshow.children[3];
    thirdicon.classList.add("light");
    thirdicon.previousElementSibling.classList.remove("light");
    setTimeout(()=>{
        slideshow.removeChild(firsticon);
        slideshow.appendChild(firsticon);
        setTimeout(()=>{
            firsticon.classList.remove("faded-out");
        },500);
    },500);
},3000);
// end of slideshow

// form validation
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");
const error = (input,message) => {
    input.nextElementSibling.classList.add("error");
    input.nextElementSibling.textContent = message;
};

const success = () =>{
    input.nextElementSibling.classList.remove("error");
}

const checkrequiredfields = (inputarr) => {
    inputarr.forEach((input) => {
        if(input.value.trim() === ""){
            error(input,`${input.id} is required`);
        }
    });
};

const checklength = (input,min)=>{
    if(input.value.trim().length<min){
        error(input,`${input.id} must be at least ${min} characters`);
    }else{
        success(input);
    }
}

const checkemail = (input)=>{
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(re.test(input.value.trim())){
      success(input);
  }else{
      error(input,"Email is not valid");
  }
}
form.addEventListener("submit",(e) => {
    e.preventDefault();
    checklength(username,2);
    checklength(subject,2);
    checklength(message,10);
    checkemail(email);
    checkrequiredfields([username,email,subject,message]);
});
// end of form validation
// end of section 5