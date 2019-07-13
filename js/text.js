var screenAnimateElements={
    '.screen-1':[
        '.header__logo',
        '.header__nav',
        '.screen-1__heading',
        '.screen-1__subheading',
       
    ],
    '.screen-2':[
        '.screen-2__heading',
        '.screen-2__underline',
        '.screen-2__subheading',
        '.screen-2__uncle',
        '.screen-2__rocket',
    ],
    '.screen-3':[
       '.screen-3__sc3',
       '.screen-3__heading',
       '.screen-3__underline',
       '.screen-3__subheading',
       '.screen-3__lan',
    ],
    '.screen-4':[
        '.screen-4__heading',
        '.screen-4__underline',
        '.screen-4__subheading',
        '.screen-4__wrap1',
     ],
     '.screen-5':[
        '.screen-5__sc5',
        '.screen-5__heading',
        '.screen-5__underline',
        '.screen-5__subheading',
     ],
}

function setScreenAnimate(screenCls){
var screen=document.querySelector(screenCls);//获取当前屏的元素
var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素

var isSETAnimateClass=false;//是否有初始化子元素的样式
var isAnimateDone=false;//当前屏幕下所有子元素的状态是DONE？
screen.onclick=function(){
//初始化样式，增加init  A A_init
if (isSETAnimateClass===false) {
    for(var i=0;i<animateElements.length;i++){

        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
    isSETAnimateClass=true;
    return;

}

    //切换所有animateElements的init->done  A A_Done
if (isAnimateDone===false) {
    for(var i=0;i<animateElements.length;i++){

        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
    isAnimateDone=true;
    return;
}

    //切换所有animateElements的done->init  A A_init
    if (isAnimateDone===true) {
        for(var i=0;i<animateElements.length;i++){
    
            var element=document.querySelector(animateElements[i]);
            var baseCls=element.getAttribute('class');
            element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
        }
        isAnimateDone=false;
        return;
    }
}
}

for(k in screenAnimateElements){
setScreenAnimate(k);
}
