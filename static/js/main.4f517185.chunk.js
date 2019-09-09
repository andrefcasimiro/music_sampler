(window.webpackJsonpmusic_machine=window.webpackJsonpmusic_machine||[]).push([[0],{22:function(e,t,n){e.exports=n.p+"static/media/Kick.6471470d.WAV"},23:function(e,t,n){e.exports=n.p+"static/media/Snare.d76d77c9.WAV"},24:function(e,t,n){e.exports=n.p+"static/media/ClosedHat.bf48fb20.WAV"},25:function(e,t,n){e.exports=n.p+"static/media/OpenHat.67b2afb3.WAV"},26:function(e,t,n){e.exports=n.p+"static/media/Clap.ce5193f6.WAV"},27:function(e,t,n){e.exports=n.p+"static/media/Bass.a8a60608.wav"},28:function(e,t,n){e.exports=n.p+"static/media/PAD.9c1dc1af.mp3"},31:function(e,t,n){e.exports=n(58)},36:function(e,t,n){},37:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),s=n(21),r=n.n(s),c=n(4),o=n(5),l=n(7),u=n(6),m=n(2),d=n(8),p=window.AudioContext||window.webkitAudioContext,h=function(){function e(t){Object(c.a)(this,e),this.context=new p({latencyHint:"interactive",sampleRate:44100}),this.bufferSize=4096,this.processor=this.context.createScriptProcessor(this.bufferSize,0,1),this.processor.onaudioprocess=this.audioCallback.bind(this),this.processor.connect(this.context.destination),this.context.suspend()}return Object(o.a)(e,[{key:"audioCallback",value:function(e){}}]),e}(),f=n(11),b=n(10),g=(n(36),n(9));var v,O=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).playSound=function(){var e=n.props,t=e.instrument,a=e.audioManager;if(n.state.cachedSample&&n.state.cachedSample.file){var i=a.context.createBufferSource();i.buffer=n.state.cachedSample.file,i.playbackRate.value=n.state.pitch;var s=a.context.createGain();s.gain.value=n.state.volume,s.connect(a.context.destination),i.connect(s),i.connect(a.context.destination),i.start(0)}else!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4?arguments[4]:void 0,s=new XMLHttpRequest,r=e;e=e.replace("public/","/"),s.open("GET",e,!0),s.responseType="arraybuffer",s.onload=function(){t.decodeAudioData(s.response,(function(e){var s=t.createBufferSource();s.playbackRate.value=n;var c=t.createGain();c.gain.value=a,c.connect(t.destination),s.connect(c),s.buffer=e,s.connect(t.destination),s.start(0),i(e,r)}),(function(){}))},s.send()}(t.samplePath,a.context,n.state.pitch,n.state.volume,(function(e,t){return n.setState({cachedSample:{file:e,originalPath:t}})}))},n.toggleOpen=function(){n.setState({isOpen:!n.state.isOpen})},n.setPitch=function(e){n.setState({pitch:e})},n.setVolume=function(e){n.setState({volume:e})},n.reset=function(){n.setState({pitch:1,volume:1})},n.state={cachedSample:void 0,pitch:1,volume:1,isOpen:!1},n.playSound=n.playSound.bind(Object(m.a)(n)),n.setPitch=n.setPitch.bind(Object(m.a)(n)),n.setVolume=n.setVolume.bind(Object(m.a)(n)),n.reset=n.reset.bind(Object(m.a)(n)),n.toggleOpen=n.toggleOpen.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.state.cachedSample&&this.state.cachedSample.originalPath!==e.instrument.samplePath&&(console.log("new file was uploaded, we need to remove the cached sample and make the client request the new sample"),this.setState({cachedSample:void 0}))}},{key:"render",value:function(){var e=this,t=this.props.selection[this.props.selectionID],n=this.props,a=n.marker,s=n.active,r="step ";return r=a?r+"stepMarker ":r,r=s?r+"stepActive ":r,r=t?r+"stepSelected ":r,s&&t&&this.playSound(),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:r,onClick:function(){return e.props.onSelect(e.props.selectionID)}}),i.a.createElement("div",{className:"optionWrapper"},t&&i.a.createElement("button",{className:"option",onClick:this.toggleOpen},i.a.createElement(g.d,null))),this.state.isOpen&&t&&i.a.createElement("div",{className:"contextMenuWrapper"},i.a.createElement("div",{className:"contextMenu"},i.a.createElement("p",null,i.a.createElement(g.c,{onClick:function(){return e.setPitch(e.state.pitch-.05)}}),i.a.createElement("p",null,"Pitch: ",this.state.pitch.toFixed(2)),i.a.createElement(g.a,{onClick:function(){return e.setPitch(e.state.pitch+.05)}})),i.a.createElement("p",null,i.a.createElement(g.c,{onClick:function(){return e.setVolume(e.state.volume-.1)}}),i.a.createElement("p",null,"Volume: ",this.state.volume.toFixed(2)),i.a.createElement(g.a,{onClick:function(){return e.setVolume(e.state.volume+.1)}})),i.a.createElement("p",null,i.a.createElement("button",{onClick:function(){return e.reset()}},"Reset")))))}}]),t}(a.Component),E=(n(37),function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleSelect=function(e){var t=n.state.selection;t[e]=!t[e],n.setState({selection:t})},n.drawSteps=function(){for(var e=[],t=0;t<n.props.settings.steps;t++){var a=t===n.props.sequencer.currentPosition,s=t%4;e.push(i.a.createElement(O,{key:t,active:a,marker:!!s,instrument:n.props.instrument,audioManager:n.props.audioManager,onSelect:n.handleSelect,selection:n.state.selection,selectionID:t}))}return e};for(var a=[],s=0;s<n.props.settings.steps;s++)a.push(!1);return n.state={selection:a},n.drawSteps=n.drawSteps.bind(Object(m.a)(n)),n.handleSelect=n.handleSelect.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"stepsGrid"},i.a.createElement("div",{className:"step default edit"},this.props.children),this.drawSteps()))}}]),t}(a.Component)),S=n(22),w=n.n(S),P=n(23),j=n.n(P),y=n(24),k=n.n(y),C=n(25),x=n.n(C),N=n(26),M=n.n(N),A=n(27),D=n.n(A),q=n(28),I=n.n(q),B=n(29),V=n.n(B),W=n(30),R=(n(55),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t="bpm ";return t=e.marker?t+"bpmMarker ":t,t=e.active?t+"bpmActive ":t,i.a.createElement("div",{className:t})}}]),t}(a.Component)),G=function(e,t){for(var n=[],a=0;a<t.settings.steps;a++){var s=a===t.sequencer.currentPosition,r=a%4;n.push("placeholder"===e?i.a.createElement(R,{key:a,active:!1,marker:!!r}):i.a.createElement(R,{key:a,active:s,marker:!!r}))}return n};n(56);function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(n,!0).forEach((function(t){Object(b.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState({settings:H({},n.state.settings,Object(b.a)({},t,a))})},n.manageNextPosition=function(){n.state.sequencer.currentPosition+1>=n.state.settings.steps?n.setState({sequencer:H({},n.state.sequencer,{currentPosition:0})}):n.setState({sequencer:H({},n.state.sequencer,{currentPosition:n.state.sequencer.currentPosition+1})})},n.handlePlay=function(){var e=n.state.settings.tempo||1,t=n.state.settings.linesPerBeat||1,a=6*Math.pow(10,4)/t/e;v=setInterval((function(){return n.manageNextPosition()}),a)},n.handleStop=function(){clearInterval(v)},n.addNewInstrument=function(){n.setState({instruments:n.state.instruments.concat({id:String(n.state.instruments.length+Date.now()),name:"Instrument "+n.state.instruments.length,samplePath:""})})},n.onDelete=function(e){var t=n.state.instruments.filter((function(t){return t.id!==e}));n.setState({instruments:t})},n.editName=function(e){return function(t){var a=t.target.value,i=n.state.instruments,s=i.find((function(t){return t.id===e}));i[i.indexOf(s)].name=a,n.setState({instruments:i})}},n.editSamplePath=function(e){return function(t){var a=new FormData;a.append("file",t.target.files[0]);var i="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"http://localhost:8000/upload":"https://andrefcasimiro.github.io/music_sampler/upload";V.a.post(i,a,{}).then((function(t){if(console.log(t),200===t.status){var a="public/uploads/"+t.data.filename,i=n.state.instruments,s=i.find((function(t){return t.id===e}));i[i.indexOf(s)].samplePath=a,n.setState({instruments:i})}})).catch((function(e){return console.log("upload failed: ",e)}))}},n.state={settings:{tempo:120,steps:window.innerWidth>880?16:8,linesPerBeat:4},sequencer:{currentPosition:0},instruments:[{id:String(0+Date.now()),name:"Kick",samplePath:w.a},{id:String(1+Date.now()),name:"Snare",samplePath:j.a},{id:String(2+Date.now()),name:"Closed Hat",samplePath:k.a},{id:String(3+Date.now()),name:"Open Hat",samplePath:x.a},{id:String(4+Date.now()),name:"Clap",samplePath:M.a},{id:String(5+Date.now()),name:"Bass",samplePath:D.a},{id:String(6+Date.now()),name:"Pad",samplePath:I.a}]},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n.handlePlay=n.handlePlay.bind(Object(m.a)(n)),n.manageNextPosition=n.manageNextPosition.bind(Object(m.a)(n)),n.addNewInstrument=n.addNewInstrument.bind(Object(m.a)(n)),n.onDelete=n.onDelete.bind(Object(m.a)(n)),n.editName=n.editName.bind(Object(m.a)(n)),n.editSamplePath=n.editSamplePath.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){this.handleStop()}},{key:"componentDidUpdate",value:function(e,t){this.state.settings!==t.settings&&(this.handleStop(),e.audioManagerAllowed&&this.handlePlay())}},{key:"componentWillReceiveProps",value:function(e){e.audioManagerAllowed?this.handlePlay():this.handleStop()}},{key:"render",value:function(){var e=this,t=this.state.instruments;return i.a.createElement("div",{className:"settingsContainer"},i.a.createElement("div",{className:"setting"},i.a.createElement("p",null,"BPM:"),i.a.createElement("input",{type:"number",name:"tempo",value:this.state.settings.tempo,onChange:this.handleChange,min:1}),i.a.createElement("p",null,"Steps:"),i.a.createElement("input",{type:"number",name:"steps",value:this.state.settings.steps,onChange:this.handleChange,min:1}),i.a.createElement("p",null,"Lines Per Beat:"),i.a.createElement("input",{type:"number",name:"linesPerBeat",value:this.state.settings.linesPerBeat,onChange:this.handleChange,min:1})),i.a.createElement("div",{className:"bpmGrid"},i.a.createElement("div",{className:"bpm default empty"})," ",G("bpm",this.state)),t.length>0&&i.a.createElement("div",{className:"instrumentGrid"},t.map((function(t,n){return i.a.createElement(E,{key:t.id,instrument:t,sequencer:e.state.sequencer,settings:e.state.settings,audioManager:e.props.audioManager},i.a.createElement("input",{type:"text",value:t.name,onChange:e.editName(t.id)}),i.a.createElement("div",{className:"row"},i.a.createElement("input",{name:t.id,id:t.id,className:"inputfile",type:"file",onChange:e.editSamplePath(t.id)}),i.a.createElement("label",{for:t.id},i.a.createElement(g.b,null)),i.a.createElement("button",{className:"buttonRemove",onClick:function(){return e.onDelete(t.id)}},i.a.createElement(W.a,null))))}))),i.a.createElement("div",{className:"addNewInstrument",onClick:this.addNewInstrument},i.a.createElement("div",{className:"emptyStep"},i.a.createElement("p",null,"+"))," ",G("placeholder",this.state)))}}]),t}(a.Component),J=(n(57),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).resumeAudioContext=function(){n.state.audioManager&&(n.state.audioManagerAllowed?n.state.audioManager.context.suspend():n.state.audioManager.context.resume(),n.setState({audioManagerAllowed:!n.state.audioManagerAllowed}))},n.state={audioManager:new h,audioManagerAllowed:!1},n.resumeAudioContext=n.resumeAudioContext.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"container"},i.a.createElement("button",{onClick:this.resumeAudioContext},this.state.audioManagerAllowed?i.a.createElement("span",null,i.a.createElement(f.a,null)," Stop"):i.a.createElement("span",null,i.a.createElement(f.b,null)," Play")),i.a.createElement(_,{audioManagerAllowed:this.state.audioManagerAllowed,audioManager:this.state.audioManager})),i.a.createElement("footer",null,i.a.createElement("p",null,"Made with ",i.a.createElement("strong",null,"React")," and ",i.a.createElement("strong",null,"Node JS")),i.a.createElement("br",null),i.a.createElement("p",null,"Andr\xe9 Fernandes / andrefcasimiro@gmail.com / v0.1 - 9/9/2019"),i.a.createElement("br",null),i.a.createElement("a",{href:"https://github.com/andrefcasimiro/music_sampler"},"Get the src code... (Github)")))}}]),t}(a.Component)),z=document.getElementById("root");z&&r.a.render(i.a.createElement(J,null),z)}},[[31,1,2]]]);
//# sourceMappingURL=main.4f517185.chunk.js.map