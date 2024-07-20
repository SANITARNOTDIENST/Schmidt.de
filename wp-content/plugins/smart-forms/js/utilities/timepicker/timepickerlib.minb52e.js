!function($,window,document){"use strict";var Timepicker=function(element,options){this.widget="",this.$element=$(element),this.defaultTime=options.defaultTime,this.disableFocus=options.disableFocus,this.disableMousewheel=options.disableMousewheel,this.isOpen=options.isOpen,this.minuteStep=options.minuteStep,this.modalBackdrop=options.modalBackdrop,this.orientation=options.orientation,this.secondStep=options.secondStep,this.snapToStep=options.snapToStep,this.showInputs=options.showInputs,this.showMeridian=options.showMeridian,this.showSeconds=options.showSeconds,this.template=options.template,this.appendWidgetTo=options.appendWidgetTo,this.showWidgetOnAddonClick=options.showWidgetOnAddonClick,this.icons=options.icons,this.maxHours=options.maxHours,this.explicitMode=options.explicitMode,this.handleDocumentClick=function(e){var self=e.data.scope;self.$element.parent().find(e.target).length||self.$widget.is(e.target)||self.$widget.find(e.target).length||self.hideWidget()},this._init()};Timepicker.prototype={constructor:Timepicker,_init:function(){var self=this;this.showWidgetOnAddonClick?(this.$element.parent(".input-group.bootstrap-timepicker").find(".input-group-addon").on({"click.timepicker":$.proxy(this.showWidget,this)}),this.$element.on({"focus.timepicker":$.proxy(this.highlightUnit,this),"click.timepicker":$.proxy(this.highlightUnit,this),"keydown.timepicker":$.proxy(this.elementKeydown,this),"blur.timepicker":$.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":$.proxy(this.mousewheel,this)})):this.template?this.$element.on({"focus.timepicker":$.proxy(this.showWidget,this),"click.timepicker":$.proxy(this.showWidget,this),"blur.timepicker":$.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":$.proxy(this.mousewheel,this)}):this.$element.on({"focus.timepicker":$.proxy(this.highlightUnit,this),"click.timepicker":$.proxy(this.highlightUnit,this),"keydown.timepicker":$.proxy(this.elementKeydown,this),"blur.timepicker":$.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":$.proxy(this.mousewheel,this)}),this.$widget=$(this.getTemplate()).on("click",$.proxy(this.widgetClick,this)),this.showInputs&&!1!==this.$widget&&this.$widget.find("input").each(function(){$(this).on({"click.timepicker":function(){$(this).select()},"keydown.timepicker":$.proxy(self.widgetKeydown,self),"keyup.timepicker":$.proxy(self.widgetKeyup,self)})}),this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null,this.updateFromElementVal()},clear:function(){this.hour="",this.minute="",this.second="",this.meridian="",this.$element.val("")},decrementHour:function(){if(this.showMeridian)if(1===this.hour)this.hour=12;else{if(12===this.hour)return this.hour--,this.toggleMeridian();if(0===this.hour)return this.hour=11,this.toggleMeridian();this.hour--}else this.hour<=0?this.hour=this.maxHours-1:this.hour--},decrementMinute:function(step){var newVal;(newVal=step?this.minute-step:this.minute-this.minuteStep)<0?(this.decrementHour(),this.minute=newVal+60):this.minute=newVal},decrementSecond:function(){var newVal=this.second-this.secondStep;newVal<0?(this.decrementMinute(!0),this.second=newVal+60):this.second=newVal},elementKeydown:function(e){switch(e.which){case 9:if(e.shiftKey){if("hour"===this.highlightedUnit){this.hideWidget();break}this.highlightPrevUnit()}else{if(this.showMeridian&&"meridian"===this.highlightedUnit||this.showSeconds&&"second"===this.highlightedUnit||!this.showMeridian&&!this.showSeconds&&"minute"===this.highlightedUnit){this.hideWidget();break}this.highlightNextUnit()}e.preventDefault(),this.updateFromElementVal();break;case 27:this.updateFromElementVal();break;case 37:e.preventDefault(),this.highlightPrevUnit(),this.updateFromElementVal();break;case 38:switch(e.preventDefault(),this.highlightedUnit){case"hour":this.incrementHour(),this.highlightHour();break;case"minute":this.incrementMinute(),this.highlightMinute();break;case"second":this.incrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update();break;case 39:e.preventDefault(),this.highlightNextUnit(),this.updateFromElementVal();break;case 40:switch(e.preventDefault(),this.highlightedUnit){case"hour":this.decrementHour(),this.highlightHour();break;case"minute":this.decrementMinute(),this.highlightMinute();break;case"second":this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update()}},getCursorPosition:function(){var input=this.$element.get(0);if("selectionStart"in input)return input.selectionStart;if(document.selection){input.focus();var sel=document.selection.createRange(),selLen=document.selection.createRange().text.length;return sel.moveStart("character",-input.value.length),sel.text.length-selLen}},getTemplate:function(){var template,hourTemplate,minuteTemplate,secondTemplate,meridianTemplate,templateContent;switch(this.showInputs?(hourTemplate='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>',minuteTemplate='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>',secondTemplate='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>',meridianTemplate='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'):(hourTemplate='<span class="bootstrap-timepicker-hour"></span>',minuteTemplate='<span class="bootstrap-timepicker-minute"></span>',secondTemplate='<span class="bootstrap-timepicker-second"></span>',meridianTemplate='<span class="bootstrap-timepicker-meridian"></span>'),templateContent='<table><tr><td><a href="#" data-action="incrementHour"><span class="'+this.icons.up+'"></span></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><span class="'+this.icons.up+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><span class="'+this.icons.up+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><span class="'+this.icons.up+'"></span></a></td>':"")+"</tr><tr><td>"+hourTemplate+'</td> <td class="separator">:</td><td>'+minuteTemplate+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+secondTemplate+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+meridianTemplate+"</td>":"")+'</tr><tr><td><a href="#" data-action="decrementHour"><span class="'+this.icons.down+'"></span></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><span class="'+this.icons.down+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><span class="'+this.icons.down+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><span class="'+this.icons.down+'"></span></a></td>':"")+"</tr></table>",this.template){case"modal":template='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">&times;</a><h3>Pick a Time</h3></div><div class="modal-content">'+templateContent+'</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';break;case"dropdown":template='<div class="bootstrap-timepicker-widget dropdown-menu">'+templateContent+"</div>"}return template},getTime:function(){return""===this.hour?"":this.hour+":"+(1===this.minute.toString().length?"0"+this.minute:this.minute)+(this.showSeconds?":"+(1===this.second.toString().length?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:"")},hideWidget:function(){!1!==this.isOpen&&(this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),"modal"===this.template&&this.$widget.modal?this.$widget.modal("hide"):this.$widget.removeClass("open"),$(document).off("mousedown.timepicker, touchend.timepicker",this.handleDocumentClick),this.isOpen=!1,this.$widget.detach())},highlightUnit:function(){this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"second":this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.showMeridian?this.highlightMeridian():this.showSeconds?this.highlightSecond():this.highlightMinute();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){var $element=this.$element.get(0),self=this;this.highlightedUnit="hour",$element.setSelectionRange&&setTimeout(function(){self.hour<10?$element.setSelectionRange(0,1):$element.setSelectionRange(0,2)},0)},highlightMinute:function(){var $element=this.$element.get(0),self=this;this.highlightedUnit="minute",$element.setSelectionRange&&setTimeout(function(){self.hour<10?$element.setSelectionRange(2,4):$element.setSelectionRange(3,5)},0)},highlightSecond:function(){var $element=this.$element.get(0),self=this;this.highlightedUnit="second",$element.setSelectionRange&&setTimeout(function(){self.hour<10?$element.setSelectionRange(5,7):$element.setSelectionRange(6,8)},0)},highlightMeridian:function(){var $element=this.$element.get(0),self=this;this.highlightedUnit="meridian",$element.setSelectionRange&&(this.showSeconds?setTimeout(function(){self.hour<10?$element.setSelectionRange(8,10):$element.setSelectionRange(9,11)},0):setTimeout(function(){self.hour<10?$element.setSelectionRange(5,7):$element.setSelectionRange(6,8)},0))},incrementHour:function(){if(this.showMeridian){if(11===this.hour)return this.hour++,this.toggleMeridian();12===this.hour&&(this.hour=0)}this.hour!==this.maxHours-1?this.hour++:this.hour=0},incrementMinute:function(step){var newVal;(newVal=step?this.minute+step:this.minute+this.minuteStep-this.minute%this.minuteStep)>59?(this.incrementHour(),this.minute=newVal-60):this.minute=newVal},incrementSecond:function(){var newVal=this.second+this.secondStep-this.second%this.secondStep;newVal>59?(this.incrementMinute(!0),this.second=newVal-60):this.second=newVal},mousewheel:function(e){if(!this.disableMousewheel){e.preventDefault(),e.stopPropagation();var delta=e.originalEvent.wheelDelta||-e.originalEvent.detail,scrollTo=null;switch("mousewheel"===e.type?scrollTo=-1*e.originalEvent.wheelDelta:"DOMMouseScroll"===e.type&&(scrollTo=40*e.originalEvent.detail),scrollTo&&(e.preventDefault(),$(this).scrollTop(scrollTo+$(this).scrollTop())),this.highlightedUnit){case"minute":delta>0?this.incrementMinute():this.decrementMinute(),this.highlightMinute();break;case"second":delta>0?this.incrementSecond():this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian();break;default:delta>0?this.incrementHour():this.decrementHour(),this.highlightHour()}return!1}},changeToNearestStep:function(segment,step){return segment%step==0?segment:Math.round(segment%step/step)?(segment+(step-segment%step))%60:segment-segment%step},place:function(){if(!this.isInline){var widgetWidth=this.$widget.outerWidth(),widgetHeight=this.$widget.outerHeight(),windowWidth=$(window).width(),windowHeight=$(window).height(),scrollTop=$(window).scrollTop(),zIndex=parseInt(this.$element.parents().filter(function(){return"auto"!==$(this).css("z-index")}).first().css("z-index"),10)+10,offset=this.component?this.component.parent().offset():this.$element.offset(),height=this.component?this.component.outerHeight(!0):this.$element.outerHeight(!1),width=this.component?this.component.outerWidth(!0):this.$element.outerWidth(!1),left=offset.left,top=offset.top;
        var $relativeParent=rnJQuery(this.appendWidgetTo);

        while(($relativeParent=$relativeParent.parent())!=null)
        {
            try
            {
                if ($relativeParent.css('position') === 'relative')
                    break;
            }catch (err)
            {
                $relativeParent=null;
                break;
            }
        }

        if($relativeParent!=null)
        {
            top-=$relativeParent.offset().top;
            left-=$relativeParent.offset().left;
        }

    this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"),"auto"!==this.orientation.x?(this.$widget.addClass("timepicker-orient-"+this.orientation.x),"right"===this.orientation.x&&(left-=widgetWidth-width)):(this.$widget.addClass("timepicker-orient-left"),offset.left<0?left-=offset.left-10:offset.left+widgetWidth>windowWidth&&(left=windowWidth-widgetWidth-10));var topOverflow,bottomOverflow,yorient=this.orientation.y;"auto"===yorient&&(topOverflow=-scrollTop+offset.top-widgetHeight,bottomOverflow=scrollTop+windowHeight-(offset.top+height+widgetHeight),yorient=Math.max(topOverflow,bottomOverflow)===bottomOverflow?"top":"bottom"),this.$widget.addClass("timepicker-orient-"+yorient),"top"===yorient?top+=height:top-=widgetHeight+parseInt(this.$widget.css("padding-top"),10),this.$widget.css({top:top,left:left,zIndex:zIndex})}},remove:function(){$("document").off(".timepicker"),this.$widget&&this.$widget.remove(),delete this.$element.data().timepicker},setDefaultTime:function(defaultTime){if(this.$element.val())this.updateFromElementVal();else if("current"===defaultTime){var dTime=new Date,hours=dTime.getHours(),minutes=dTime.getMinutes(),seconds=dTime.getSeconds(),meridian="AM";0!==seconds&&60===(seconds=Math.ceil(dTime.getSeconds()/this.secondStep)*this.secondStep)&&(minutes+=1,seconds=0),0!==minutes&&60===(minutes=Math.ceil(dTime.getMinutes()/this.minuteStep)*this.minuteStep)&&(hours+=1,minutes=0),this.showMeridian&&(0===hours?hours=12:hours>=12?(hours>12&&(hours-=12),meridian="PM"):meridian="AM"),this.hour=hours,this.minute=minutes,this.second=seconds,this.meridian=meridian,this.update()}else!1===defaultTime?(this.hour=0,this.minute=0,this.second=0,this.meridian="AM"):this.setTime(defaultTime)},setTime:function(time,ignoreWidget){if(time){var timeMode,timeArray,hour,minute,second,meridian;if("object"==typeof time&&time.getMonth)hour=time.getHours(),minute=time.getMinutes(),second=time.getSeconds(),this.showMeridian&&(meridian="AM",hour>12&&(meridian="PM",hour%=12),12===hour&&(meridian="PM"));else{if((timeMode=(/a/i.test(time)?1:0)+(/p/i.test(time)?2:0))>2)return void this.clear();if(timeArray=time.replace(/[^0-9\:]/g,"").split(":"),hour=timeArray[0]?timeArray[0].toString():timeArray.toString(),this.explicitMode&&hour.length>2&&hour.length%2!=0)return void this.clear();minute=timeArray[1]?timeArray[1].toString():"",second=timeArray[2]?timeArray[2].toString():"",hour.length>4&&(second=hour.slice(-2),hour=hour.slice(0,-2)),hour.length>2&&(minute=hour.slice(-2),hour=hour.slice(0,-2)),minute.length>2&&(second=minute.slice(-2),minute=minute.slice(0,-2)),hour=parseInt(hour,10),minute=parseInt(minute,10),second=parseInt(second,10),isNaN(hour)&&(hour=0),isNaN(minute)&&(minute=0),isNaN(second)&&(second=0),second>59&&(second=59),minute>59&&(minute=59),hour>=this.maxHours&&(hour=this.maxHours-1),this.showMeridian?(hour>12&&(timeMode=2,hour-=12),timeMode||(timeMode=1),0===hour&&(hour=12),meridian=1===timeMode?"AM":"PM"):hour<12&&2===timeMode?hour+=12:hour>=this.maxHours?hour=this.maxHours-1:(hour<0||12===hour&&1===timeMode)&&(hour=0)}this.hour=hour,this.snapToStep?(this.minute=this.changeToNearestStep(minute,this.minuteStep),this.second=this.changeToNearestStep(second,this.secondStep)):(this.minute=minute,this.second=second),this.meridian=meridian,this.update(ignoreWidget)}else this.clear()},showWidget:function(){this.isOpen||this.$element.is(":disabled")||(this.$widget.appendTo(this.appendWidgetTo),$(document).on("mousedown.timepicker, touchend.timepicker",{scope:this},this.handleDocumentClick),this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.place(),this.disableFocus&&this.$element.blur(),""===this.hour&&(this.defaultTime?this.setDefaultTime(this.defaultTime):this.setTime("0:0:0")),"modal"===this.template&&this.$widget.modal?this.$widget.modal("show").on("hidden",$.proxy(this.hideWidget,this)):!1===this.isOpen&&this.$widget.addClass("open"),this.isOpen=!0)},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM"},update:function(ignoreWidget){this.updateElement(),ignoreWidget||this.updateWidget(),this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(!1!==this.$widget){var hour=this.hour,minute=1===this.minute.toString().length?"0"+this.minute:this.minute,second=1===this.second.toString().length?"0"+this.second:this.second;this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(hour),this.$widget.find("input.bootstrap-timepicker-minute").val(minute),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(second),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(hour),this.$widget.find("span.bootstrap-timepicker-minute").text(minute),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(second),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))}},updateFromWidgetInputs:function(){if(!1!==this.$widget){var t=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(t,!0)}},widgetClick:function(e){e.stopPropagation(),e.preventDefault();var $input=$(e.target),action=$input.closest("a").data("action");action&&this[action](),this.update(),$input.is("input")&&$input.get(0).setSelectionRange(0,2)},widgetKeydown:function(e){var $input=$(e.target),name=$input.attr("class").replace("bootstrap-timepicker-","");switch(e.which){case 9:if(e.shiftKey){if("hour"===name)return this.hideWidget()}else if(this.showMeridian&&"meridian"===name||this.showSeconds&&"second"===name||!this.showMeridian&&!this.showSeconds&&"minute"===name)return this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(e.preventDefault(),name){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),$input.get(0).setSelectionRange(0,2);break;case 40:switch(e.preventDefault(),name){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),$input.get(0).setSelectionRange(0,2)}},widgetKeyup:function(e){(65===e.which||77===e.which||80===e.which||46===e.which||8===e.which||e.which>=48&&e.which<=57||e.which>=96&&e.which<=105)&&this.updateFromWidgetInputs()}},$.fn.timepicker=function(option){var args=Array.apply(null,arguments);return args.shift(),this.each(function(){var $this=$(this),data=$this.data("timepicker"),options="object"==typeof option&&option;data||$this.data("timepicker",data=new Timepicker(this,$.extend({},$.fn.timepicker.defaults,options,$(this).data()))),"string"==typeof option&&data[option].apply(data,args)})},$.fn.timepicker.defaults={defaultTime:"current",disableFocus:!1,disableMousewheel:!1,isOpen:!1,minuteStep:15,modalBackdrop:!1,orientation:{x:"auto",y:"auto"},secondStep:15,snapToStep:!1,showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:!0,icons:{up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down"},maxHours:24,explicitMode:!1},$.fn.timepicker.Constructor=Timepicker,$(document).on("focus.timepicker.data-api click.timepicker.data-api",'[data-provide="timepicker"]',function(e){var $this=$(this);$this.data("timepicker")||(e.preventDefault(),$this.timepicker())})}(rnJQuery,window,document);