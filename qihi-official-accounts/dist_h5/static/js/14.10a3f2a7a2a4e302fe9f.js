webpackJsonp([14],{LqYc:function(t,e,i){var r,o;o=function(){function t(t){this.mode=i.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var o=[],s=this.data.charCodeAt(e);s>65536?(o[0]=240|(1835008&s)>>>18,o[1]=128|(258048&s)>>>12,o[2]=128|(4032&s)>>>6,o[3]=128|63&s):s>2048?(o[0]=224|(61440&s)>>>12,o[1]=128|(4032&s)>>>6,o[2]=128|63&s):s>128?(o[0]=192|(1984&s)>>>6,o[1]=128|63&s):o[0]=s,this.parsedData.push(o)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,i=this.parsedData.length;e<i;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){var i=new t(e);this.dataList.push(i),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,i){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[r][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,i),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,i)},setupPositionProbePattern:function(t,e){for(var i=-1;i<=7;i++)if(!(t+i<=-1||this.moduleCount<=t+i))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+i][e+r]=0<=i&&i<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==i||6==i)||2<=i&&i<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,i=0;i<8;i++){this.makeImpl(!0,i);var r=d.getLostPoint(this);(0==i||t>r)&&(t=r,e=i)}return e},createMovieClip:function(t,e,i){var r=t.createEmptyMovieClip(e,i);this.make();for(var o=0;o<this.modules.length;o++)for(var s=1*o,a=0;a<this.modules[o].length;a++){var n=1*a;this.modules[o][a]&&(r.beginFill(0,100),r.moveTo(n,s),r.lineTo(n+1,s),r.lineTo(n+1,s+1),r.lineTo(n,s+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=d.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var i=0;i<t.length;i++){var r=t[e],o=t[i];if(null==this.modules[r][o])for(var s=-2;s<=2;s++)for(var a=-2;a<=2;a++)this.modules[r+s][o+a]=-2==s||2==s||-2==a||2==a||0==s&&0==a}},setupTypeNumber:function(t){for(var e=d.getBCHTypeNumber(this.typeNumber),i=0;i<18;i++){var r=!t&&1==(e>>i&1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=r}for(i=0;i<18;i++){r=!t&&1==(e>>i&1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=r}},setupTypeInfo:function(t,e){for(var i=this.errorCorrectLevel<<3|e,r=d.getBCHTypeInfo(i),o=0;o<15;o++){var s=!t&&1==(r>>o&1);o<6?this.modules[o][8]=s:o<8?this.modules[o+1][8]=s:this.modules[this.moduleCount-15+o][8]=s}for(o=0;o<15;o++){s=!t&&1==(r>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=s:o<9?this.modules[8][15-o-1+1]=s:this.modules[8][15-o-1]=s}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var i=-1,r=this.moduleCount-1,o=7,s=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var n=0;n<2;n++)if(null==this.modules[r][a-n]){var h=!1;s<t.length&&(h=1==(t[s]>>>o&1)),d.getMask(e,r,a-n)&&(h=!h),this.modules[r][a-n]=h,-1==--o&&(s++,o=7)}if((r+=i)<0||this.moduleCount<=r){r-=i,i=-i;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,i,r){for(var o=_.getRSBlocks(t,i),s=new m,a=0;a<r.length;a++){var n=r[a];s.put(n.mode,4),s.put(n.getLength(),d.getLengthInBits(n.mode,t)),n.write(s)}var h=0;for(a=0;a<o.length;a++)h+=o[a].dataCount;if(s.getLengthInBits()>8*h)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*h+")");for(s.getLengthInBits()+4<=8*h&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*h||(s.put(e.PAD0,8),s.getLengthInBits()>=8*h));)s.put(e.PAD1,8);return e.createBytes(s,o)},e.createBytes=function(t,e){for(var i=0,r=0,o=0,s=new Array(e.length),a=new Array(e.length),n=0;n<e.length;n++){var h=e[n].dataCount,l=e[n].totalCount-h;r=Math.max(r,h),o=Math.max(o,l),s[n]=new Array(h);for(var c=0;c<s[n].length;c++)s[n][c]=255&t.buffer[c+i];i+=h;var u=d.getErrorCorrectPolynomial(l),f=new v(s[n],u.getLength()-1).mod(u);a[n]=new Array(u.getLength()-1);for(c=0;c<a[n].length;c++){var g=c+f.getLength()-a[n].length;a[n][c]=g>=0?f.get(g):0}}var p=0;for(c=0;c<e.length;c++)p+=e[c].totalCount;var _=new Array(p),m=0;for(c=0;c<r;c++)for(n=0;n<e.length;n++)c<s[n].length&&(_[m++]=s[n][c]);for(c=0;c<o;c++)for(n=0;n<e.length;n++)c<a[n].length&&(_[m++]=a[n][c]);return _};for(var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},o={L:1,M:0,Q:3,H:2},s=0,a=1,n=2,h=3,l=4,c=5,u=6,f=7,d={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;d.getBCHDigit(e)-d.getBCHDigit(d.G15)>=0;)e^=d.G15<<d.getBCHDigit(e)-d.getBCHDigit(d.G15);return(t<<10|e)^d.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;d.getBCHDigit(e)-d.getBCHDigit(d.G18)>=0;)e^=d.G18<<d.getBCHDigit(e)-d.getBCHDigit(d.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return d.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,i){switch(t){case s:return(e+i)%2==0;case a:return e%2==0;case n:return i%3==0;case h:return(e+i)%3==0;case l:return(Math.floor(e/2)+Math.floor(i/3))%2==0;case c:return e*i%2+e*i%3==0;case u:return(e*i%2+e*i%3)%2==0;case f:return(e*i%3+(e+i)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new v([1],0),i=0;i<t;i++)e=e.multiply(new v([1,g.gexp(i)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:case i.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),i=0,r=0;r<e;r++)for(var o=0;o<e;o++){for(var s=0,a=t.isDark(r,o),n=-1;n<=1;n++)if(!(r+n<0||e<=r+n))for(var h=-1;h<=1;h++)o+h<0||e<=o+h||0==n&&0==h||a==t.isDark(r+n,o+h)&&s++;s>5&&(i+=3+s-5)}for(r=0;r<e-1;r++)for(o=0;o<e-1;o++){var l=0;t.isDark(r,o)&&l++,t.isDark(r+1,o)&&l++,t.isDark(r,o+1)&&l++,t.isDark(r+1,o+1)&&l++,0!=l&&4!=l||(i+=3)}for(r=0;r<e;r++)for(o=0;o<e-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(i+=40);for(o=0;o<e;o++)for(r=0;r<e-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(i+=40);var c=0;for(o=0;o<e;o++)for(r=0;r<e;r++)t.isDark(r,o)&&c++;return i+=10*(Math.abs(100*c/e/e-50)/5)}},g={glog:function(t){if(t<1)throw new Error("glog("+t+")");return g.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return g.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},p=0;p<8;p++)g.EXP_TABLE[p]=1<<p;for(p=8;p<256;p++)g.EXP_TABLE[p]=g.EXP_TABLE[p-4]^g.EXP_TABLE[p-5]^g.EXP_TABLE[p-6]^g.EXP_TABLE[p-8];for(p=0;p<255;p++)g.LOG_TABLE[g.EXP_TABLE[p]]=p;function v(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var i=0;i<t.length&&0==t[i];)i++;this.num=new Array(t.length-i+e);for(var r=0;r<t.length-i;r++)this.num[r]=t[r+i]}function _(t,e){this.totalCount=t,this.dataCount=e}function m(){this.buffer=[],this.length=0}v.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),i=0;i<this.getLength();i++)for(var r=0;r<t.getLength();r++)e[i+r]^=g.gexp(g.glog(this.get(i))+g.glog(t.get(r)));return new v(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=g.glog(this.get(0))-g.glog(t.get(0)),i=new Array(this.getLength()),r=0;r<this.getLength();r++)i[r]=this.get(r);for(r=0;r<t.getLength();r++)i[r]^=g.gexp(g.glog(t.get(r))+e);return new v(i,0).mod(t)}},_.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],_.getRSBlocks=function(t,e){var i=_.getRsBlockTable(t,e);if(void 0==i)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=i.length/3,o=[],s=0;s<r;s++)for(var a=i[3*s+0],n=i[3*s+1],h=i[3*s+2],l=0;l<a;l++)o.push(new _(n,h));return o},_.getRsBlockTable=function(t,e){switch(e){case o.L:return _.RS_BLOCK_TABLE[4*(t-1)+0];case o.M:return _.RS_BLOCK_TABLE[4*(t-1)+1];case o.Q:return _.RS_BLOCK_TABLE[4*(t-1)+2];case o.H:return _.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},m.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var i=0;i<e;i++)this.putBit(1==(t>>>e-i-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var C=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function k(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var i=e.toString().match(/android ([0-9]\.[0-9])/i);i&&i[1]&&(t=parseFloat(i[1]))}return t}var L=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){var e=this._htOption,i=this._el,r=t.getModuleCount();Math.floor(e.width/r),Math.floor(e.height/r);function o(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)e.hasOwnProperty(r)&&i.setAttribute(r,e[r]);return i}this.clear();var s=o("svg",{viewBox:"0 0 "+String(r)+" "+String(r),width:"100%",height:"100%",fill:e.colorLight});s.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),i.appendChild(s),s.appendChild(o("rect",{fill:e.colorLight,width:"100%",height:"100%"})),s.appendChild(o("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(var a=0;a<r;a++)for(var n=0;n<r;n++)if(t.isDark(a,n)){var h=o("use",{x:String(n),y:String(a)});h.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),s.appendChild(h)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),y="svg"===document.documentElement.tagName.toLowerCase()?L:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,i=this._el,r=t.getModuleCount(),o=Math.floor(e.width/r),s=Math.floor(e.height/r),a=['<table style="border:0;border-collapse:collapse;">'],n=0;n<r;n++){a.push("<tr>");for(var h=0;h<r;h++)a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+o+"px;height:"+s+"px;background-color:"+(t.isDark(n,h)?e.colorDark:e.colorLight)+';"></td>');a.push("</tr>")}a.push("</table>"),i.innerHTML=a.join("");var l=i.childNodes[0],c=(e.width-l.offsetWidth)/2,u=(e.height-l.offsetHeight)/2;c>0&&u>0&&(l.style.margin=u+"px "+c+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this._android&&this._android<=2.1){var e=1/window.devicePixelRatio,i=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,r,o,s,a,n,h,l,c){if("nodeName"in t&&/img/i.test(t.nodeName))for(var u=arguments.length-1;u>=1;u--)arguments[u]=arguments[u]*e;else void 0===l&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);i.apply(this,arguments)}}var r=function(t,e){this._bIsPainted=!1,this._android=k(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return r.prototype.draw=function(t){var e=this._elImage,i=this._oContext,r=this._htOption,o=t.getModuleCount(),s=r.width/o,a=r.height/o,n=Math.round(s),h=Math.round(a);e.style.display="none",this.clear();for(var l=0;l<o;l++)for(var c=0;c<o;c++){var u=t.isDark(l,c),f=c*s,d=l*a;i.strokeStyle=u?r.colorDark:r.colorLight,i.lineWidth=1,i.fillStyle=u?r.colorDark:r.colorLight,i.fillRect(f,d,s,a),i.strokeRect(Math.floor(f)+.5,Math.floor(d)+.5,n,h),i.strokeRect(Math.ceil(f)-.5,Math.ceil(d)-.5,n,h)}this._bIsPainted=!0},r.prototype.makeImage=function(){this._bIsPainted&&function(t,e){var i=this;if(i._fFail=e,i._fSuccess=t,null===i._bSupportDataURI){var r=document.createElement("img"),o=function(){i._bSupportDataURI=!1,i._fFail&&i._fFail.call(i)};return r.onabort=o,r.onerror=o,r.onload=function(){i._bSupportDataURI=!0,i._fSuccess&&i._fSuccess.call(i)},void(r.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===i._bSupportDataURI&&i._fSuccess?i._fSuccess.call(i):!1===i._bSupportDataURI&&i._fFail&&i._fFail.call(i)}.call(this,t)},r.prototype.isPainted=function(){return this._bIsPainted},r.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},r.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},r}();function w(t,e){for(var i=1,r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),s=0,a=C.length;s<=a;s++){var n=0;switch(e){case o.L:n=C[s][0];break;case o.M:n=C[s][1];break;case o.Q:n=C[s][2];break;case o.H:n=C[s][3]}if(r<=n)break;i++}if(i>C.length)throw new Error("Too long data");return i}return(r=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:o.H},"string"==typeof e&&(e={text:e}),e)for(var i in e)this._htOption[i]=e[i];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(y=L),this._android=k(),this._el=t,this._oQRCode=null,this._oDrawing=new y(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){this._oQRCode=new e(w(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},r.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},r.prototype.clear=function(){this._oDrawing.clear()},r.CorrectLevel=o,r},t.exports=o()},Vd9O:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i("/QXl"),o=i("LqYc"),s=i.n(o),a={data:function(){return{ticketList:[],checkList:[],allChoose:!1,examLevels:"",htmlTitle:"",playerName:"",gender:"",certificateType:"",certificateNo:"",examTime:"",leveNames:"",address:"",examPermitNo:""}},methods:{selectCurrentTicket:function(t,e){this.checkList.length===this.ticketList.length?this.allChoose=!0:this.allChoose=!1},selectCurrentAll:function(){this.allChoose=!this.allChoose,this.allChoose?this.checkList=this.ticketList:this.checkList=[]},getQrCode:function(t){new s.a("qrcode",{width:180,height:180,text:t})},downTickets:function(t){var e=this;console.log(t,"item"),this.htmlTitle=t.playerName+"的准考证",this.playerName=t.playerName,this.gender=t.gender,this.certificateType=t.certificateType,this.certificateNo=t.certificateNo,this.leveNames=t.leveNames,this.address=t.address,this.examPermitNo=t.examPermitNo,this.getQrCode(t.examPermitNo),this.examTime=this.formatDate(t.examTime,"YYYY-MM-DD hh:mm"),setTimeout(function(){e.getPdf("#pdfDom")},2e3)},emailBtn:function(){alert("功能开发中")},initScrollBox:function(){var t=this;if(void 0!==this.ticketList&&null!==this.ticketList&&this.ticketList.length>0){var e=52*this.ticketList.lenght;e<=539?(this.$refs.ticketWarpper.style.heigth=e+"px",this.$nextTick(function(){t.scroll?t.scroll.refresh():t.scroll=new r.a(t.$refs.ticketWarpper,{click:!0})})):(this.$refs.ticketWarpper.style.heigth="539px",console.log(this.$refs.ticketWarpper.style.heigth,"321"),this.$nextTick(function(){t.scroll?t.scroll.refresh():t.scroll=new r.a(t.$refs.ticketWarpper,{click:!0})}))}}},created:function(){var t=this;this.examLevels=JSON.parse(sessionStorage.getItem("ticketsDetails")).examLevels,this.ticketList=JSON.parse(sessionStorage.getItem("ticketsDetails")).playerList,this.$nextTick(function(){t.initScrollBox()})}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ticketsPdfPage"},[i("div",{ref:"ticketWarpper",staticClass:"ticketBox ticketWarpper"},[i("div",{staticClass:"titleTop"},[i("span",[t._v("报考级别")]),i("span",[t._v(t._s(t.examLevels))])]),t._v(" "),i("ul",{staticClass:"content"},t._l(t.ticketList,function(e,r){return i("li",{key:r},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.checkList,expression:"checkList"}],attrs:{type:"checkbox",id:e.chessPlayerId},domProps:{value:e,checked:Array.isArray(t.checkList)?t._i(t.checkList,e)>-1:t.checkList},on:{change:[function(i){var r=t.checkList,o=i.target,s=!!o.checked;if(Array.isArray(r)){var a=e,n=t._i(r,a);o.checked?n<0&&(t.checkList=r.concat([a])):n>-1&&(t.checkList=r.slice(0,n).concat(r.slice(n+1)))}else t.checkList=s},function(i){return t.selectCurrentTicket(e,r)}]}}),t._v(" "),i("label",{attrs:{for:e.chessPlayerId}}),t._v(" "),i("span",[t._v(t._s(e.playerName)+"的准考证.pdf")]),t._v(" "),i("button",{on:{click:function(i){return t.downTickets(e)}}},[t._v("打开")])])}),0)]),t._v(" "),i("div",{staticClass:"ssss"},[i("div",{attrs:{id:"pdfDom"}},[i("div",{staticClass:"ticketDetails"},[t._m(0),t._v(" "),i("div",{staticClass:"examerInfo"},[i("div",{staticClass:"lf"},[i("p",[t._v("姓　　名:"),i("span",[t._v(t._s(t.playerName))])]),t._v(" "),i("p",[t._v("性　　别:"),i("span",[t._v(t._s(0===t.gender?"男":"女"))]),t._v(" 证件类型:"),1===t.certificateType?i("span",{staticStyle:{color:"#000","margin-left":"20px"}},[t._v("身份证")]):t._e()]),t._v(" "),i("p",[i("i",{staticClass:"threeLetter"},[t._v("证件号")]),t._v(":"),i("span",[t._v(t._s(t.certificateNo))])]),t._v(" "),i("p",[t._v("报考等级:"),i("span",[t._v(t._s(t.leveNames))])]),t._v(" "),i("p",[t._v("准考证号:"),i("span",[t._v(t._s(t.examPermitNo))])]),t._v(" "),i("p",[t._v("考试时间:"),i("span",[t._v(t._s(t.examTime))])]),t._v(" "),i("p",[t._v("考试地点:"),i("span",[t._v(t._s(t.address))])])]),t._v(" "),i("div",{attrs:{id:"qrcode"}})]),t._v(" "),t._m(1)])])]),t._v(" "),i("div",{staticClass:"pageBottom"},[i("p",{staticClass:"checkBtn"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.allChoose,expression:"allChoose"}],attrs:{type:"checkbox",id:"selectAll"},domProps:{checked:Array.isArray(t.allChoose)?t._i(t.allChoose,null)>-1:t.allChoose},on:{click:t.selectCurrentAll,change:function(e){var i=t.allChoose,r=e.target,o=!!r.checked;if(Array.isArray(i)){var s=t._i(i,null);r.checked?s<0&&(t.allChoose=i.concat([null])):s>-1&&(t.allChoose=i.slice(0,s).concat(i.slice(s+1)))}else t.allChoose=o}}}),t._v(" "),i("label",{staticClass:"lab",attrs:{for:"selectAll"}}),t._v(" "),i("span",[t._v("全选")])]),t._v(" "),i("p",{staticClass:"emailBtn",on:{click:t.emailBtn}},[t._v("\n          发送到邮箱\n        ")])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titleTop"},[e("div",[this._v("准考证")]),this._v(" "),e("p",[this._v("2019年中国围棋协会段级位标准化考试")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"testInstructions"},[i("h3",[t._v("考试须知:")]),t._v(" "),i("p",[t._v("1、 考试可提前15分钟到场；迟到10分，考试资格作废，需重新报名。")]),t._v(" "),i("p",[t._v("2、 考试座位:无固定座位号，无人座位均可使用。")]),t._v(" "),i("p",[t._v("3、 考试流程")]),t._v(" "),i("li",[t._v("(1) 找到座位")]),t._v(" "),i("li",[t._v("(2) 确定考试设备开机")]),t._v(" "),i("li",[t._v("(3) 准考证二维码对准镜头，进行身份认证")]),t._v(" "),i("li",[t._v("(4) 扫码成功，开始答题")]),t._v(" "),i("p",[t._v("4、 现场除考试题相关问题，均可咨询监考老师。")])])}]};var h=i("C7Lr")(a,n,!1,function(t){i("yW4n")},"data-v-4afa82e1",null);e.default=h.exports},yW4n:function(t,e){}});
//# sourceMappingURL=14.10a3f2a7a2a4e302fe9f.js.map