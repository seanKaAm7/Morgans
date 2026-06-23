/*
---------
[2026년 6월 23일]
  * 홈 화면 방향을 루틴 대시보드가 아니라 AI 매니저에게 바로 전화 거는 미니멀 Call 화면으로 변경.
  * 수동 매니저 콜, 예약 루틴 콜, v2 CallKit/PushKit 실험 흐름을 분리해 정리.
  * 매니저 프로필과 보이스 선택을 위한 assistant_profiles, user_voice_settings 데이터 모델 추가.
  * 수동 매니저 콜을 저장할 수 있도록 routine_calls.routine_id를 nullable로 바꾸고 call_type을 추가.
  * 보이스 선택 화면, 샘플 화면 제작 기준, 테스트/데모/구현 우선순위를 새 UI 방향에 맞게 수정.
---------
*/
