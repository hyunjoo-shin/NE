// 제이쿼리 코드블록 1 ///////////////////////
// 메인 배너 슬라이드 ////////////////////////
$(function(){ // jQB 1 /////////////////////

    var sld = $(".slide li");
    var indic = $("#indic li");
    var snum = 0;

    //////////////  goSlide 함수  ////////////////////////
    var goSlide = function(){
        sld.eq(snum).addClass("on").siblings().removeClass("on");
        indic.eq(snum) 
        .find("img").attr("src","image/bl_on.png")
        .parents("li").siblings() 
        .find("img").attr("src","image/bl_off.png");

    }; ///////////// goSlide함수 끝  ///////////////

    // 광클금지상태변수
    let prot = 0;
    // 오른쪽화살표 클릭
    $(".arrow2").click(function(){

        //// 광클금지
        if(prot) return;

        clearAuto();

        // 1. 슬라이드 순번증가 //////////////////////////
        snum++;
        if(snum === sld.length) snum = 0;
        // 한계수체크: 슬라이드 개수와 같아지면 처음으로!
        console.log("슬라이드개수:"+sld.length);
        console.log("슬라이드번호:"+snum);

        // 2. 슬라이드 이동함수 호출!
        goSlide();
        
    }); /////////// click /////////////////

    // 1-2. 왼쪽 버튼 클릭
    
    $(".arrow1").click(function(){

        //// 광클금지설정 //////////////////
        if(prot) return;//값이1이면 돌아가!
        prot = 1;//불허용!
        setTimeout(() => {prot = 0;}, 800);
        // 0.8초후 허용! ///////////////////

        // 확인
        console.log("왼쪽이동!");

        // 자동실행 지우기!
        clearAuto();

        // 1. 슬라이드 순번감소 //////////////////////////
        snum--;
        if(snum === -1) snum = sld.length-1;//개수-1=마지막순번
        // 한계수체크: 슬라이드 개수와 같아지면 처음으로!
        console.log("슬라이드개수:"+sld.length);
        console.log("슬라이드번호:"+snum);

        // 2. 슬라이드 이동함수 호출!
        goSlide();

    }); /////////// click ///////////////////////

    // 블릿 li클릭시 슬라이드변경 & 블릿변경
    // 대상: #indic li -> 변수 indic에 할당!
    indic.click(function(){

        //// 광클금지설정 //////////////////
        if(prot) return;//값이1이면 돌아가!
        prot = 1;//불허용!
        setTimeout(() => {prot = 0;}, 800);
        // 0.8초후 허용! ///////////////////

        // 자동실행 지우기!
        clearAuto();

        // 1. 클릭된 li순번 확인
        let idx = $(this).index();
        // index() 메서드 - 선택된 요소의 형제들 중 순번을 리턴함
        console.log("블릿li순번:"+idx);

        // 2. 클릭된 순번을 슬라이드 순번변수 snum 넣는다!
        snum = idx;

        // 3. 슬라이드 이동함수 호출!
        goSlide();

    }); /////////// click ///////////////


    // 인터발용 변수
    var autoI;
    /*/////////////////////////////////////
        함수명: autoSlide
        기능: 슬라이드 자동호출 셋팅
    *//////////////////////////////////////
    var autoSlide = function(){

        // 2.인터발셋팅(3초간격)
        // 인터발함수는 변수에 넣어야 지울 수 있으므로 할당함!
        autoI = setInterval(function(){

            // 2-1. 기존snum값 1씩증가
            snum++;

            // 2-2. 한계수 체크(다시 처음으로)
            if(snum===sld.length) snum = 0;

            // 2-3. 슬라이드 함수 호출!
            goSlide();

        },3000); //// 인터발함수 ///////

    }; ///////// autoSlide함수 /////////////
    ////////////////////////////////////////

    // 최초 인터발실행 함수 호출은 할당된 함수 아래에서 함!(중요!)
    autoSlide();

    /// 타임아웃용 변수
    var autoT;
    /*/////////////////////////////////////
        함수명: clearAuto
        기능: 슬라이드 자동호출 인터발지우기
    *//////////////////////////////////////
    var clearAuto = function(){

        // 2. 인터발지우기
        clearInterval(autoI);
        // clearInterval(인터발할당변수) - 인터발호출 멈추기!

        // 3. 실행쓰나미 방지를 위해 타임아웃 지우기!
        clearTimeout(autoT);

        // 4. 일정시간 후 다시 인터발호출하기!
        // setTimeout의 실행쓰나미방지를 위해 변수에 할당함!
        // 실행전에 지워서 항상 마지막 하나만 남게해야한다!!!
        autoT = setTimeout(autoSlide,5000);//5초후


    }; ///////// clearAuto함수 /////////////
    ////////////////////////////////////////




}); //////////// jQB 1 //////////////////////////////////////
///////////////////////////////////////////////////////////





///////  이벤트 배너 슬라이드 ///////////////////////////////////////////
$(function(){ // jQB 2 /////////////////////////////////////////

    setInterval(function(){
        
        $(".event").animate({left:"-580px"},600,
        function(){
            let first = $(".event").find("img").first();
            $(this).append(first).css({left:"0"});
            
            let second = $(".event img").eq(2).attr("src");
        
            console.log(first.offset().left); 
        });//////// animate ///////////////////////////

        // 화면에서 중앙으로 보이는 배너 이미지 .on(=opacity:1) 
        $(".event img").eq(2).addClass("on").siblings().removeClass("on");
        
    },3000); /// 인터벌함수 //////////////////////////////

    /////////  불릿 클릭 시 불릿이미지 변경 + 해당 슬라이드 보여주기  /////////////////
    $(".indic li").click(function(){

        $(this).find("img").attr("src","image/bl_on.png")
        .parents("li").siblings() 
        .find("img").attr("src","image/bl_off.png");

        let idx = $(this).index();
        console.log(idx);

        $(".event img:nth-child(idx)").css({left: "1160px" });

        
    
    });/////////  click  ////////////////////
});////////// jQB 2  /////////////////////////////////////////



///////////  로그인 팝업   //////////////////////////// 
////////// jQB 3  ///////////////////////////////
$(function(){
    $("a.login").click(function(){
        $("#popup").show(100);
        
    });

    $("#popup #login").click(function(){
        location.href="https://www.nebuildandgrow.co.kr/mall/pages/etc/login.asp?WHEREJOIN=77&FNUM=1";
    });

    $("#popup #close").click(function(){
        $("#popup").hide(100);
    });
});////////// jQB 3  ////////////////////////////////