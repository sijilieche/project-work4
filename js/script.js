//获取元素
var getElem = function (selector) {
    return document.querySelector(selector);
}
var getAllElem = function (selector) {
    return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls = function (element) {
    return element.getAttribute('class');
}
// 设置元素样式
var setCls = function (element, cls) {
    return element.setAttribute('class', cls);
}
// 为元素添加样式
var addCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + ' ' + cls);
    }
}
// 为元素删除样式
var delCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
}

// 第一步：初始化样式 init
var screenAnimateElements = {
    '.screen-1': [
        '.header__logo',
        '.header__nav',
        '.screen-1__heading',
        '.screen-1__subheading',

    ],
    '.screen-2': [
        '.screen-2__heading',
        '.screen-2__underline',
        '.screen-2__subheading',
        '.screen-2__uncle',
        '.screen-2__rocket',
    ],
    '.screen-3': [
        '.screen-3__sc3',
        '.screen-3__heading',
        '.screen-3__underline',
        '.screen-3__subheading',
        '.screen-3__lan',
    ],
    '.screen-4': [
        '.screen-4__heading',
        '.screen-4__underline',
        '.screen-4__subheading',
        '.screen-4__wrap1',
    ],
    '.screen-5': [
        '.screen-5__sc5',
        '.screen-5__heading',
        '.screen-5__underline',
        '.screen-5__subheading',
    ],
};
// 设置屏内元素为初始状态
function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
    }
}

// 第一步：初始化设置
window.onload = function () {

    //  为所有元素设置 init
    for (k in screenAnimateElements) {
        if (k == '.screen-1') {
            continue;
        }
        setScreenAnimateInit(k);
    }
    console.log('onload')

}
// 第二步：滚动条设置
function playScreenAnimateDone(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
    }
}
//  第二步附加：初始化第一屏的动画（1. skipScreenAnimateInit 2.跳过 init ）
setTimeout(function () {
    playScreenAnimateDone('.screen-1');
}, 200)

// 第二步：滚动到哪里，就播放到哪里
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');
var switchNavItemsActive = function (idx) {
    for (var i = 0; i < navItems.length; i++) {
        console.log(navItems[i]);
        delCls(navItems[i], 'header__nav-item_status_active');
        navTip.style.left = 0 + 'px';

    }
    addCls(navItems[idx], 'header__nav-item_status_active');
    navTip.style.left = (idx * 96) + 'px';

    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i], 'outline__item_status_active');

    }
    addCls(outLineItems[idx], 'outline__item_status_active');

}

window.onscroll = function () {
    var top = document.documentElement.scrollTop;
//   2.1 导航条样式变动
if (top > 60) {
    addCls(getElem('.header'), 'header_status_grey');
  } else {
    delCls(getElem('.header'), 'header_status_grey');

    switchNavItemsActive(0); // 后面添加的，不需要立刻
  }

  if (top > (236 * 1)) {
    addCls(getElem('.outline'), 'outline_status_in');
  }

  if (top > (640 * 1)) {
    playScreenAnimateDone('.screen-2');

    switchNavItemsActive(1); // 后面添加的，不需要立刻
  }
  if (top > (640 * 2)) {
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2);
  }
  if (top > (640 * 3)) {
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3);
  }
  if (top > (640 * 4)) {
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4);
  }
}


//  第三步 导航条双向定位

// 3.1 导航条 - 点击页面跳转

var setNavJump = function (i, lib) {
    var elem = lib[i];
    elem.onclick = function () {
        document.documentElement.scrollTop = i * 640+1;
    }
  }
  
  for (var i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems);
  }
  // 3.2  页面右侧固定导航栏-当鼠标点击某个字时，页面切换到相对应的区域
  
  for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i, outLineItems);
  }
// 当鼠标切换导航项时，下划线跟随鼠标移动到相应的导航项上；
var navTip = getElem('.header__nav-tip');
var setTip = function (idx, lib) {
    lib[idx].onmouseover = function () {
        console.log(this, idx);
        navTip.style.left = (idx * 96) + 'px';
    }
    var activeIdx = 0;
    lib[idx].onmouseout = function () {
        console.log(activeIdx);
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = (activeIdx * 96) + 'px';
    }
}
for (var i = 0; i < navItems.length; i++) {
    setTip(i, navItems);
}

// 鼠标经过logo区时，无下划线，鼠标变小手状
var passLogo=getElem('.header__logo');
passLogo.onmouseover=function(){
    this.style.cursor='pointer';
}
passLogo.onmouseout=function(){
    this.style.cursor='none';
}


// 鼠标停在“即刻学习”按钮上时，按钮背景颜色发生变化；鼠标离开，按钮恢复默认样式；
navItems[5].onmouseover = function () {
    this.style.cursor='pointer';
    this.style.background = "#BA0015";
}
navItems[5].onmouseout = function () {
    this.style.cursor='none';
    this.style.background = "red";
}
// (其他)鼠标放在“继续了解学习体验”按钮上时，按钮上的文字颜色发生变化
var screen6Heading = getElem('.screen-6__heading');
screen6Heading.onmouseover = function () {
    this.style.cursor='pointer';
    this.style.color = "red";
}
screen6Heading.onmouseout = function () {
    this.style.cursor='none';
    this.style.color = "black";
}
// (其他)当点击该按钮时，返回页面的顶部； 
screen6Heading.onclick = function () {
    document.documentElement.scrollTop =0;
}
/* （页面右侧固定导航栏）当鼠标放在每个字上，鼠标变小手状字体颜色发生变化，
放在字与字之间没有任何变化； */
var outlineItem=getAllElem('.outline__item');
function fn(){
    for(var j=0;j<outlineItem.length;j++){
        outlineItem[j].onmouseover = function () {
            this.style.color = "red";
        }
        outlineItem[j].onmouseout = function () {
            this.style.color = "black";
        }
    }
}
fn();

// （页脚区）鼠标放在版权导航上时，变小手状，导航文字变成红色
var copyright=getElem('.footer__copyright');
copyright.onmouseover = function () {
    this.style.cursor='pointer';
    this.style.color = "red";
}
copyright.onmouseout = function () {
    this.style.color = "#787d82";
}