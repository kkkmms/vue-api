const USERSTATUS = {
    S1 :{result : "회원가입 성공!", resultDesc:"회원가입이 완료되었습니다.",},
    S2 :{result : "로그인 성공!", resultDesc:"로그인이 완료되었습니다.",},
    S3 :{result : "로그인 성공!", resultDesc:"아직 작성하신 글이 없네요.. 새 글을 작성해보세요!",},
    S4 :{result : "게시글 등록 성공!.", resultDesc:"게시글이 등록 되었습니다..",},
    S5 :{result : "게시글 삭제 성공!.", resultDesc:"게시글이 삭제 되었습니다..",},
    S6 :{result : "회원탈퇴 성공!.", resultDesc:"회원님의 모든 데이터가 삭제 되었습니다.",},
    E1 :{result : "회원가입 실패", resultDesc:"아이디, 비밀번호, 이메일을 전부 입력해주세요.",},
	E2 :{result : "회원가입 실패", resultDesc:"이미 존재하는 아이디 입니다.",},
    E3 :{result : "로그인 실패", resultDesc:"아이디 혹은 비밀번호를 확인해주세요.",},  
    E4 :{result : "로그인 실패", resultDesc:"아이디 혹은 비밀번호를 입력해주세요.",},
    E5 :{result : "게시글 등록 실패", resultDesc:"등록할 글을 작성해주세요.",},
    E99 :{result : "DB오류", resultDesc:"DB 연동 실패"},
  };

  module.exports = USERSTATUS;