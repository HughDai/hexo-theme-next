/**
 * Created by hughdai on 17/8/11.
 */
//事件处理
var EventCtrl = {
  addEvent: function (ele, type, fn) {
    if (ele.addEventListener) {
      ele.addEventListener(type, fn, false);
    }
    else {
      ele.attachEvent('on' + type, fn);
    }
  },
  removeEvent: function (ele, type, fn) {
    if (ele.removeEventListener) {
      ele.removeEventListener(type, fn, false);
    }
    else {
      ele.detachEvent('on' + type, fn);
    }
  }
}
//获取元素样式
function getStyle(ele, style) {
  if (getComputedStyle) {
    return getComputedStyle(ele, false)[style];
  }
  else {
    return ele.currentStyle[style];
  }
}
function drag() {
  var x = 0, y = 0, top = 0, left = 0;
  var mouseDown = false;
  var dialog = document.getElementById('dialog');
  EventCtrl.addEvent(this, 'mousedown', function (event) {
    mouseDown = true;
    this.onselectstart = function () {
      return false;
    };
    var e = event || window.event;
    left = parseInt(getStyle(dialog, 'left'));//记录当前元素偏移
    top = parseInt(getStyle(dialog, 'top'));
    x = parseInt(e.clientX || e.x);//记录当前鼠标位置
    y = parseInt(e.clientY || e.y);
  })

  EventCtrl.addEvent(document, 'mousemove', function (event) {
    if (mouseDown) {
      var e = event || window.event;
      var container = document.getElementById('wrapper')
      var currentX = parseInt(e.clientX || e.x);//当前鼠标位置
      var currentY = parseInt(e.clientY || e.y);
      var displayX = currentX - x + left;//新鼠标位置减去旧鼠标位置加上元素偏移
      var displayY = currentY - y + top;
      var width = container.offsetWidth - dialog.offsetWidth;
      var height = container.offsetHeight - dialog.offsetHeight;
      console.log('displayX:' + displayX, 'displayY:' + displayY);
      //限制元素不被拖出容器范围
      if (displayX < 0) {
        displayX = 0
      }
      else if (displayX > width) {
        displayX = width
      }
      if (displayY < 0) {
        displayY = 0
      }
      else if (displayY > height) {
        displayY = height
      }
      dialog.style.left = displayX + 'px';
      dialog.style.top = displayY + 'px';
    }
  })

  EventCtrl.addEvent(document, 'mouseup', function (event) {
    mouseDown = false;
    left = parseInt(getStyle(dialog, 'left'));
    top = parseInt(getStyle(dialog, 'top'));
    EventCtrl.removeEvent(document, 'mousemove', function () {

    })
    EventCtrl.removeEvent(document, 'mouseup', function () {

    })
  })
}
document.addEventListener('DOMContentLoaded', function () {
  drag.call(document.getElementById('title'));
}, false)
