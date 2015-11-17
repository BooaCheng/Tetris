var indexBlock_now=new Array(4);
var shape_now=0;
var clearTimerIndex=false;
var shapeArray=new Array("shapeI","shapeJ","shapeL","shapeO","shapeS","shapeT","shapeZ");
var fixedBlocks=new Array(11*20);
var score=0;
var level=0;
var timerDown;
var finalstate=0;
var finishState=0;
$(document).ready(function(){
  var startStatus=false;
  
  var blocks=new Array(11*20);
  
  		for(var i=0; i< 11*20 ;i++){
	       var $block;
	       $block=$('<div '+'id="blockId'+i+'" '+'class="backBlock"></div>');
	    
	        blocks[i]=$block;
	        $("#inner").append($block);
          fixedBlocks[i]=0;
	    }    
     $("#buttonLeft").click(function(){
             var modIndex=new Array(4);
              if(!isNaN(indexBlock_now[0])){
                for(var i=0;i<indexBlock_now.length;i++){
                  modIndex[i]=indexBlock_now[i]%11;
                }
                clearBlock(blocks,indexBlock_now);
                for(var i=0;i<indexBlock_now.length;i++){
                  if(Math.min.apply(Math, modIndex)==0)
                    indexBlock_now[i]=indexBlock_now[i];
                  else
                     indexBlock_now[i]=indexBlock_now[i]-1;
                }
                changeBlock(blocks,indexBlock_now);
              }  
            }); 
     $("#buttonRight").click(function(){
           var modIndex=new Array(4);
            if(!isNaN(indexBlock_now[0])){
              for(var i=0;i<indexBlock_now.length;i++){
                modIndex[i]=indexBlock_now[i]%11;
              }
              clearBlock(blocks,indexBlock_now);
              for(var i=0;i<indexBlock_now.length;i++){
                if(Math.max.apply(Math, modIndex)==10)
                  indexBlock_now[i]=indexBlock_now[i];
                else
                   indexBlock_now[i]=indexBlock_now[i]+1;
              }
              changeBlock(blocks,indexBlock_now);
            }  
          }); 
     
      $("#buttonDown").mousedown(
             function(){
              timerDown=setInterval(function(){
              clearBlock(blocks,indexBlock_now);
              
                var indexArray_test=fall_test(blocks,indexBlock_now);
                var isFixed=checkFixed(fixedBlocks,indexArray_test);
                if(Math.max.apply(Math, indexArray_test)<220 && isFixed==false){
                  for(var i=0;i<indexBlock_now.length;i++){
                   indexBlock_now[i]=indexBlock_now[i]+11;
                  }
                } 
              changeBlock(blocks,indexBlock_now);
            },50);
          }); 
      $("#buttonDown").mouseup(function(){
             clearInterval(timerDown);
          }); 
	$("#buttonStart").click(function(){
 		if(startStatus==false){
            clearTimerIndex=false;
	    	    startFall(blocks,fixedBlocks);
            startStatus=true;
          
	   	 }
		else{
        var indexBlock=new Array(11*20);
        for(var i=0;i<11*20;i++){
          indexBlock[i]=i;
          fixedBlocks[i]=0;
        }
        for(var i=0;i<indexBlock_now.length;i++){
                indexBlock_now[i]=null;
              }
        clearBlock(blocks,indexBlock);
	    	startStatus=false;
        clearTimerIndex=true;
        changeScore(0);
        level=0;
	    }    
    
	});
  $("#buttonChange").click(function(){
        if(!isNaN(indexBlock_now[0])){
          clearBlock(blocks,indexBlock_now);
          var XYindex=new Array(indexBlock_now.length*2);
          XYindex=trans2XYindex(indexBlock_now);
          XYindex=rotate90(XYindex);
          indexBlock_now=trans2Trtrisindex(XYindex);
       }  
         
          changeBlock(blocks,indexBlock_now);

          
  });

});
function calIndex(index){
  	var shape=shapeArray[index];
  	var output=new Array(4);
  	if(shape=="shapeI")
  	{
  		output=[1,12,23,34];
  	}else if(shape=="shapeJ"){
        output=[1,2,3,14];
  	}
  	else if(shape=="shapeL"){
  		output=[1,2,3,12];
  	}
  	else if(shape=="shapeO"){
  		output=[1,2,12,13];
  	}
  	else if(shape=="shapeS"){
  		output=[2,3,12,13];
  	}
  	else if(shape=="shapeT"){
  		output=[1,2,3,13];
  	}
  	else if(shape=="shapeZ"){
  		output=[1,2,13,14];
  	}
  	return output;
}
function moveToCenter(indexArray){
	for (var x=0 ;x<indexArray.length;x++){
		indexArray[x]+=3;
	}
	return indexArray;
}
function changeBlock(blockArray,indexArray){
  for(var i=0;i<indexArray.length;i++){
    var tempId=blockArray[indexArray[i]];
    tempId.attr("class","chosen");
   
 }
}
function clearBlock(blockArray,indexArray){
  for(var i=0;i<indexArray.length;i++){
    var tempId=blockArray[indexArray[i]];
    tempId.attr("class","backBlock");
   
 }
}
function fall_test(blockArray,indexArray){
  if(Math.max.apply(Math, indexArray)<220){
  var indexArray_new=new Array(indexArray.length) ;
   for(var i=0;i<indexArray.length;i++){
    indexArray_new[i]=indexArray[i]+11;
 }
  return indexArray_new;
  }else{
  return indexArray;
  }
}
function fall(blockArray,indexArray){
  if(Math.max.apply(Math, indexArray)<220){
  var indexArray_new=new Array(indexArray.length) ;
   for(var i=0;i<indexArray.length;i++){
    indexArray_new[i]=indexArray[i]+11;
 }
  clearBlock(blockArray,indexArray);
  changeBlock(blockArray,indexArray_new);
  return indexArray_new;
  }else{
  return indexArray;
  }
}
function fixedBlock(blockArray,fixedBlockArray,indexArray){
  for(var i=0;i<indexArray.length;i++){
    blockArray[indexArray[i]].attr("class","fixed");
    fixedBlockArray[indexArray[i]]=1;// fixed
 }
}

function checkFixed(fixedBlockArray,indexArray){
  var test=0;
  var test_fix=false;
  for(var i=0;i<indexArray.length;i++){
    if(fixedBlockArray[indexArray[i]]==1) {// fixed
      test=test+1;
    }else{
      test=test+0;
    }
 }
  if (test==0)
    test_fix=false;
  else
    test_fix=true;

  return test_fix;
}
function startFall(blocks,fixedBlocks){
   var isGameover=false;
   var indexRandom=Math.floor(Math.random()*shapeArray.length);
  shape_now=indexRandom;
  indexBlock_now=calIndex(indexRandom);
  indexBlock_now=moveToCenter(indexBlock_now);
  changeBlock(blocks,indexBlock_now);
  var indexArray_new;
  var timer=setInterval(function(){
    indexArray_new=indexBlock_now;
      var indexArray_test=fall_test(blocks,indexArray_new);
      var isFixed=checkFixed(fixedBlocks,indexArray_test);
       if (finishState==1){
          alert("win!");
          alert("Your score is"+score+" !");
          clearInterval(timer);
       }
      if(Math.max.apply(Math, indexArray_test)>=220 || isFixed){
          window.clearInterval(timer);
          window.clearInterval(timerDown);
          fixedBlock(blocks,fixedBlocks,indexArray_new);
          if(isFixed && Math.min.apply(Math, indexArray_new)<11){
            window.clearInterval(timer);
            alert("gameover!");
          }else{
            
            checkscored(blocks,fixedBlocks);
            if(level==1 && finalstate==0){
                finalstate=1;
                var timeLast=3.0;
                var timeCount;
                timeCount=setInterval(function(){
                             if(timeLast>0){
                                timeLast=timeLast-0.1;
                                $("#countBlock output").html(timeLast.toFixed(1));
                             }else{
                              finishState=1;
                              clearInterval(timeCount);
                             }   
                          },100);
                  
            }
            window.clearInterval(timer);
            startFall(blocks,fixedBlocks);
          }
        }
        else{
           
            if(clearTimerIndex==false)     
              indexBlock_now=fall(blocks,indexArray_new);
            else
               window.clearInterval(timer);
        }
  },100*(4-level));
}
function trans2XYindex(indexArray){
   var XYindex=new Array(2*indexArray.length);
   for(var i=0;i<indexArray.length;i++){
      XYindex[i*2+0]= indexArray[i]%11  ; // X
      XYindex[i*2+1]= Math.floor(indexArray[i]/11);   // Y
   } 
   return XYindex;
}
function rotate90(indexXY){
  var indexXYout=new Array(indexXY.length);
  var indexXYtemp=new Array(indexXY.length);
  var fixindex;
  var zeroX=indexXY[0];
  var zeroY=indexXY[1];
  for (var i=0;i<indexXY.length/2;i++){
    indexXYtemp[i*2+0]=indexXY[i*2+0]-zeroX;
    indexXYtemp[i*2+1]=indexXY[i*2+1]-zeroY;
  }
   for (var i=0;i<indexXY.length/2;i++){
    indexXYout[i*2+0]=-indexXYtemp[i*2+1]+zeroX;
    indexXYout[i*2+1]=indexXYtemp[i*2+0]+zeroY;
  }
  for (var i=0;i<indexXY.length/2;i++){
    if(indexXYout[i*2+0]<0){
        fixindex= -indexXYout[i*2+0];
        for (var j=0;j<indexXY.length/2;j++){
            indexXYout[j*2+0]=indexXYout[j*2+0]+fixindex;
        }
    }
  
  }
   for (var i=0;i<indexXY.length/2;i++){
    if(indexXYout[i*2+0]>10){
        fixindex= indexXYout[i*2+0]-10;
        for (var j=0;j<indexXY.length/2;j++){
            indexXYout[j*2+0]=indexXYout[j*2+0]-fixindex;
        }
    }
  
  }
  return indexXYout;
}
function trans2Trtrisindex(indexArray){
   var Tindex=new Array(indexArray.length/2);
   for(var i=0;i<indexArray.length/2;i++){
      Tindex[i]= indexArray[i*2+0]+indexArray[i*2+1]*11  ; 
    }
    for(var i=0;i<indexArray.length/2;i++){
      while(Tindex[i]<0){
         for (var j=0;j<indexArray.length/2;j++){
            Tindex[j]=Tindex[j]+11;
        }
      }
      while(Tindex[i]>219 ||fixedBlocks[Tindex[i]]==1){
        alert(Tindex[0]);
        alert(Tindex[1]);
        alert(Tindex[2]);
        alert(Tindex[3]);
       for (var j=0;j<indexArray.length/2;j++){
            Tindex[j]=Tindex[j]-11;
        }
      }   
   } 
   return Tindex;
}
function checkscored(blockArray,fixedBlocks){
  var timeStamp=0;
  var temprow=0;
  var tempall=0;
  var scoreTemp=0;
  var scoreArray=new Array;
  var blockArray_temp=new Array(11*20);
  var indexArray_clear=new Array(11*20);
  for(var i=0;i<11*20;i++){
    indexArray_clear[i]=i;
  }
  for(var i=19;i>-1;i--){
    temprow=0;
    for(var j=0;j<11;j++){
      if(blockArray[i*11+j].hasClass('fixed')){
        temprow++;
      }
    }
    if(temprow==11){
      scoreArray.push(i);
    }
  }
  for(var ii=0;ii<20;ii++){
    if(scoreArray.length==4){
      if(ii<scoreArray[3]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length)*11+iii]=1;
           }
        }
      }else if(ii>scoreArray[3] && ii<scoreArray[2]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-1)*11+iii]=1;
           }
        }  
      }else if(ii>scoreArray[2] && ii<scoreArray[1]){
         for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-2)*11+iii]=1;
           }
        }  
      }else if(ii>scoreArray[1] && ii<scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-3)*11+iii]=1;
           }
        } 
      }else if(ii>scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[ii*11+iii]=1;
           }
        } 
      }
      scoreTemp=1000;
      timeStamp=100;
    }else if(scoreArray.length==3){
      if(ii<scoreArray[2]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length)*11+iii]=1;
           }
        }
      }else if(ii>scoreArray[2] && ii<scoreArray[1]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-1)*11+iii]=1;
           }
        }  
      }else if(ii>scoreArray[1] && ii<scoreArray[0]){
         for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-2)*11+iii]=1;
           }
        }  
      }else if(ii>scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[ii*11+iii]=1;
           }
        } 
      }
      scoreTemp=500;
      timeStamp=100;
    }
    else if(scoreArray.length==2){
      if(ii<scoreArray[1]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length)*11+iii]=1;
           }
        }
      }else if(ii>scoreArray[1] && ii<scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length-1)*11+iii]=1;
           }
        }  
      }else if(ii>scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[ii*11+iii]=1;
           }
        } 
      }
      scoreTemp=300;
      timeStamp=100;
    }
    else if(scoreArray.length==1){
      if(ii<scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[(ii+scoreArray.length)*11+iii]=1;
           }
        }
      }else if(ii>scoreArray[0]){
        for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[ii*11+iii]=1;
           }
        } 
      }
      scoreTemp=100;
      timeStamp=100;
    }else{
       for(var iii=0;iii<11;iii++){
           if(blockArray[ii*11+iii].hasClass('fixed')){
              blockArray_temp[ii*11+iii]=1;
           }
        } 
    }
  } 
  for(var i=0;i<fixedBlocks.length;i++){
    fixedBlocks[i]=0;
  }
  clearBlock(blockArray,indexArray_clear);
  score=score+scoreTemp;
  setTimeout(function(){
    for(var i=0;i<blockArray_temp.length;i++){
      if(blockArray_temp[i]==1){
        blockArray[i].attr("class","fixed");
        fixedBlocks[i]=1;// fixed
    }
   }
  }, timeStamp);
  changeScore(score);
  if(score>=300){
    level=3;
    $("#levelOut").html("<b>3</b>");
    

  }else if(score>=200){
    level=2;
    $("#levelOut").html("<b>2</b>");
  }else if(score>=100){
    level=1;
    $("#levelOut").html("<b>1</b>");
    $("#countBlock output").css("display","inline-block");
  }
}
function changeScore(input){
  $("#scoreOut").html(input);
}