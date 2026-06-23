/*
---------
[2026년 6월 23일]
  * 문서에 남아 있던 초기 직접 WebSocket/HTTP 기본 경로 문구를 제거하고 LiveKit/WebRTC 기본 방향으로 재수정.
  * 예약 콜 v1을 LiveKit room 생성, 앱 안 수신 후 room join, AI agent 연결 흐름으로 수정.
  * API 목록에 call session join, realtime agent dispatch, realtime interrupt를 추가하고 /voice/session 계열을 제거.
  * tts_cache에 assistant_id를 추가하고 provider_usage_logs에 text_bytes를 추가.
  * Realtime voice 테스트 기준을 LiveKit room/agent/audio track 중심으로 수정.
---------
*/
/*
---------
[2026년 6월 23일]
  * LiveKit/WebRTC를 고도화가 아니라 기본 realtime voice transport로 승격.
  * 직접 WebSocket/HTTP 방식은 fallback/prototype으로 격하.
  * 예약 콜 v1 흐름을 LiveKit room 생성, 앱 안 수신 후 room join, AI agent 연결로 수정.
  * Fish Audio HTTP TTS와 WebSocket TTS streaming 사용 기준을 추가.
  * voice_line_renders와 tts_cache 역할을 분리하고, tts_cache assistant_id 및 provider_usage_logs text_bytes를 추가.
  * API를 /voice, /realtime, /call-sessions 역할 기준으로 정리.
---------
*/
/*
---------
[2026년 6월 23일]
  * 계획서를 v3.1로 교체하고 초기 음성 엔진을 Fish Audio API 경로로 수정.
  * user_devices, memory_confirmation_requests, voice_line_templates, voice_line_renders, tts_cache를 추가.
  * call_sessions를 call_status와 result_action으로 분리하고 스누즈를 현재 범위에서 제외.
  * 직접 WebSocket/HTTP 음성 세션과 고도화 LiveKit/WebRTC 구조를 분리.
  * Supabase RLS, API key 보안, APNs 환경 구분, iOS Audio Session, 실패 fallback, 테스트 기준을 추가.
---------
*/
/*
---------
[2026년 6월 23일]
  * 계획서에 남아 있던 예전 1~24번 섹션 구조를 제거하고 v3 구조로 교체.
  * 오래된 Supabase/Deepgram/Cartesia 기본 경로, routine_calls, schedule_memories, 개발 일정/우선순위 섹션을 계획서에서 제거.
  * 최신 설계를 call_sessions, user_schedule_items, Fish Speech / S2 Pro 실시간 음성 구조 중심으로 정리.
---------
*/
/*
---------
[2026년 6월 23일]
  * 개발 일정 성격의 구현 단계 섹션을 제거하고 테스트 기준만 남김.
  * 루틴 전용 call 모델을 범용 call_sessions 모델로 통합.
  * 존재하지 않는 routines 참조를 제거하고 schedule_item_id 기반으로 예약 콜을 연결하도록 수정.
  * assistant_profiles를 users보다 먼저 두어 데이터 모델 순서를 SQL 참조 관계에 맞게 정리.
---------
*/
/*
---------
[2026년 6월 23일]
  * 상세 계획서를 v3로 압축 재작성하고, 개발 일정/최종 MVP/선택지 중심 설명을 제거.
  * 최종 음성 구조를 Fish Speech / S2 Pro GPU 서버 기반 실시간 음성 콜 구조로 확정.
  * 기본 매니저 3명, reference audio, speaker token, voice_config, seed data 구조를 반영.
  * 기억 기능을 자동 패턴 분석이 아니라 사용자 직접 정보와 실제 스케줄 중심으로 변경.
  * CallKit + PushKit은 실제 LiveKit/WebRTC 음성 세션 연결 목적의 v2 구현 대상으로 정리.
---------
*/
/*
---------
[2026년 6월 23일]
  * 고정된 표현 옵션 기반 설계를 제거.
  * 설정에서 사용자가 직접 응답 스타일 지침과 예시 문장을 기록하는 구조로 변경.
  * user_response_style_settings 데이터 모델과 response-style-settings API를 추가.
  * 응답 스타일 지침은 표현 방식에만 적용되고, 상담/감정 분석/의료 조언 요구는 무시하도록 규칙을 정리.
---------
*/
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
