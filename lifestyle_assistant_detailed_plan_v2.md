# 개인 일정 매니저 음성 콜 앱 상세 계획서 v2

수정일: 2026-06-23

## 0. 한 줄 정의

사용자의 하루 일정을 짧은 음성 콜로 관리하는 iPhone용 개인 매니저 앱.

이 앱은 감정 상담 앱이 아니다. 실제 전화망으로 전화를 거는 앱도 아니다. 초기 목표는 Sesame처럼 길게 수다를 떠는 AI 친구가 아니라, 사용자의 생활 타이밍에 맞춰 짧고 정확하게 일정 확인, 우선순위 정리, 실행 지시, 스케줄 조정을 해주는 "개인 일정 매니저"다.

---

## 1. 제품 목표

### 1.1 만들고 싶은 경험

사용자는 앱을 설치하고 취침 시간, 루틴, 간단한 일정 정보를 설정한다. 정해진 시간이 되면 앱이 전화처럼 울린다. 사용자가 받으면 AI가 말한다.

예:

```text
AI:
지금 잘 시간이야. 내일 오전 9시에 일정이 있어서 오늘은 여기서 끊는 게 좋아.

User:
10분만 더.

AI:
응, 10분 뒤에 다시 부를게. 대신 그때는 바로 침대로 가자.
```

앱은 이 대화 결과를 바탕으로 스누즈를 예약하고, 취침 루틴 상태를 업데이트한다. 사용자가 피곤함, 무기력, 하기 싫음 같은 표현을 하더라도 AI는 상담하지 않고 일정 조정 신호로만 해석한다.

### 1.2 제품의 핵심 가치

- 사용자가 앱을 직접 열지 않아도 루틴 타이밍에 먼저 개입한다.
- 알림보다 더 강한 "전화 받는 느낌"으로 행동 전환을 유도한다.
- 긴 대화가 아니라 짧고 실행 중심의 음성 상호작용을 제공한다.
- 생활 데이터와 연결되어 일정, 우선순위, 다음 행동을 정리한다.
- 사용자가 "10분 뒤", "오늘은 스킵", "알겠어"처럼 자연스럽게 말해도 처리된다.
- 사용자의 감정 상태를 깊게 다루지 않고, 발화를 스케줄 조정 신호로 변환한다.

### 1.3 성공 기준

MVP 성공 기준은 다음과 같다.

- 사용자가 취침 루틴을 설정할 수 있다.
- 정해진 시간에 전화처럼 보이는 화면이 뜬다.
- 사용자가 받으면 AI 음성이 재생된다.
- 사용자가 최소 4개 답변을 음성 또는 버튼으로 처리할 수 있다.
  - 알겠어
  - 10분 뒤
  - 오늘은 스킵
  - 오늘 뭐 남았어?
- 사용자가 피곤함이나 거부감을 표현하면 상담 대신 일정 축소/스킵/재예약으로 처리된다.
- 스누즈가 실제로 다시 울린다.
- 완료/스킵/스누즈 로그가 저장된다.
- 데모에서 1분 이내의 루틴 콜 흐름이 안정적으로 끝난다.

---

## 2. 범위 정의

### 2.1 MVP에 포함할 기능

1. 사용자 설정
   - 이름 또는 닉네임
   - 시간대
   - 취침 목표 시간
   - 알림 허용 상태

2. 루틴 관리
   - 취침 루틴
   - 과제/공부 루틴
   - 운동 루틴
   - 물 마시기 루틴
   - 반복 요일
   - 활성/비활성

3. 전화형 알림 UX
   - 정해진 시간에 알림
   - 앱 내 수신 화면
   - 받기
   - 거절
   - 나중에

4. 음성 안내
   - AI가 루틴 상황을 1~2문장으로 안내
   - 처음에는 TTS로 생성한 음성을 재생
   - 네트워크 실패 시 기본 문장 또는 버튼 UI로 fallback

5. 짧은 답변 처리
   - 음성 답변 STT
   - 의도 분류
   - 스누즈/완료/스킵/질문/일정 조정 처리
   - 낮은 confidence일 때 재질문

6. 로그
   - 콜 발생 기록
   - 받음/거절/미응답
   - 스누즈 횟수
   - 완료/스킵 여부
   - 루틴 시간 변경
   - 범위 축소
   - 우선순위 변경
   - 간단한 대화 transcript

7. 개인정보 제어
   - transcript 저장 여부 설정
   - 내 정보 / 기억 관리
   - 로그 삭제
   - 계정 삭제 또는 로컬 데이터 삭제

### 2.2 MVP에서 제외할 기능

- 실제 전화망 연결
- Twilio/Telnyx/SIP 전화 발신
- Apple Health 연동
- 위치 기반 자동 판단
- 감정 상담
- 심리 상태 분석
- 자기돌봄 코칭
- 완전한 자유 대화
- 친구 같은 장기 기억 대화
- 사용자 음성 복제
- 상업 출시용 결제/구독

### 2.3 나중에 추가할 기능

- 캘린더 정식 연동
- Health 데이터 기반 취침 추천
- 운동/식사/물 마시기 루틴 확장
- 하루 요약 콜
- 아침 브리핑 콜
- 음성 톤 선택
- LiveKit 기반 실시간 통화 고도화
- 말 끊기 처리
- App Store 출시

---

## 3. 타깃 사용자

### 3.1 1차 사용자

- 생활 리듬이 불규칙한 학생
- 과제/공부/운동을 자주 미루는 사람
- 알림은 무시하지만 전화는 비교적 잘 받는 사람
- 긴 생산성 앱보다 짧은 개입을 선호하는 사람
- 감정 상담보다 실행 가능한 일정 조정을 원하는 사람

### 3.2 사용자 문제

기존 알림 앱의 문제:

- 알림이 너무 많아서 무시된다.
- 알림 문구가 맥락 없이 딱딱하다.
- 사용자가 직접 앱을 열어야 한다.
- "10분 뒤 다시 알려줘" 같은 자연스러운 반응을 처리하지 못한다.

이 앱의 해결 방식:

- 전화처럼 더 강한 attention을 만든다.
- AI가 오늘 일정/루틴 맥락을 반영해 다음 행동을 말한다.
- 음성으로 짧게 답하면 바로 상태가 바뀐다.
- 사용자의 행동 기록을 쌓아 다음 일정 배치와 우선순위를 조정한다.

---

## 4. 핵심 사용자 시나리오

### 4.1 취침 콜

```text
23:30
앱이 전화처럼 울림

User taps: 받기

AI:
지금 잘 시간이야. 내일 오전 일정이 있어서 지금 자는 게 좋아.

User:
10분 뒤에 다시 알려줘.

AI:
응, 10분 뒤에 다시 부를게.

앱:
23:40 스누즈 콜 예약
routine_logs에 snooze 저장
```

### 4.2 과제 시작 콜

```text
20:00
AI:
지금 과제 시작할 시간이야. 40분만 하고 쉬는 걸로 잡아둘게.

User:
오늘 뭐 남았어?

AI:
과제 하나, 운동 20분, 그리고 11시 반 취침 루틴이 남았어.
```

### 4.3 스킵 처리

```text
AI:
운동할 시간이야. 20분만 가볍게 할까?

User:
오늘은 스킵.

AI:
알겠어. 오늘 운동은 건너뛴 걸로 기록할게.

앱:
routine_logs에 skipped 저장
```

### 4.4 미응답 처리

```text
콜 발생
30초 동안 미응답
앱:
missed 상태 저장
일반 알림으로 "취침 루틴을 놓쳤어요" 표시
설정에 따라 5분 뒤 재시도
```

### 4.5 컨디션 기반 스케줄 조정

사용자가 피곤함, 무기력, 하기 싫음, 집중 안 됨을 말해도 AI는 상담하지 않는다. 해당 발화는 일정 변경 신호로 해석한다.

```text
AI:
운동할 시간이야. 20분만 진행할게.

User:
오늘 너무 피곤해.

AI:
오늘 운동은 제외하고 취침 루틴을 30분 앞당길게.

앱:
운동 루틴 cancel_today 저장
취침 루틴 scheduled_time 30분 앞당김
```

```text
User:
하기 싫어.

AI:
선택지는 10분 뒤로 미루기 또는 오늘 스킵이야.

앱:
reschedule 또는 cancel_today 선택 대기
```

```text
User:
집중이 안 돼.

AI:
과제 시간을 40분에서 20분으로 줄일게. 지금 시작으로 기록할까?

앱:
reduce_scope 제안
사용자 확인 후 루틴 duration 조정
```

### 4.6 메모리 저장 확인

중요한 일정 관리 정보가 나오면 바로 저장하지 않고 확인한다.

```text
User:
나 아침 운동은 못 하겠어.

AI:
운동은 저녁 시간대로 기억해둘까?

앱:
사용자 확인 후 memory_preferences에 저장
```

```text
User:
과제는 밤에 자꾸 밀려.

AI:
과제 루틴을 저녁 8시 이전으로 우선 배치해둘까?

앱:
사용자 확인 후 priority rule 저장
```

---

## 5. 제품 원칙

### 5.0 AI 역할 정의

AI는 상담봇이 아니라 개인 일정 매니저다.

AI가 하는 일:

- 일정 확인
- 루틴 상태 확인
- 우선순위 정리
- 실행 지시
- 스케줄 조정
- 스누즈/스킵/완료 기록
- 반복 패턴 기반 일정 배치 제안

AI가 하지 않는 일:

- 감정적 위로
- 심리 상담
- 자기돌봄 코칭
- 감정 상태 분석
- 사적인 고백 저장
- 의료/정신건강 조언

사용자가 감정처럼 보이는 말을 해도 AI는 이를 일정 조정 신호로 해석한다.

예:

```text
"오늘 너무 피곤해" -> 운동 제외, 취침 앞당김, 루틴 범위 축소
"하기 싫어" -> 스누즈 또는 오늘 스킵 선택지 제시
"집중이 안 돼" -> 작업 시간을 줄이고 지금 시작 여부 확인
```

### 5.1 짧게 말하기

AI의 기본 답변은 1~2문장으로 제한한다.

나쁜 예:

```text
많이 피곤했구나. 요즘 여러 가지로 지쳐 있을 수 있어. 네 마음을 이해하고...
```

좋은 예:

```text
오늘 운동은 제외하고 취침 루틴을 30분 앞당길게.
```

### 5.2 행동을 하나만 요구하기

한 번의 콜에서는 사용자가 할 행동을 하나만 제안한다.

예:

- 지금 자기
- 과제 시작하기
- 운동 20분 하기
- 물 한 잔 마시기
- 10분 뒤로 미루기
- 오늘 스킵하기
- 작업 시간을 40분에서 20분으로 줄이기

### 5.3 사용자가 통제권을 가진다

- 언제든 끊을 수 있어야 한다.
- 루틴별로 끌 수 있어야 한다.
- transcript 저장을 끌 수 있어야 한다.
- 데이터 삭제가 가능해야 한다.

### 5.4 실패해도 쓸 수 있어야 한다

AI/STT/TTS가 실패해도 버튼으로 다음 행동을 처리할 수 있어야 한다.

### 5.5 말투와 역할을 분리한다

말투는 앱 설정에서 사용자가 선택한다. 단, 어떤 말투를 선택해도 AI의 역할은 상담봇이 아니라 개인 일정 매니저로 유지된다.

말투 옵션:

- 짧고 딱딱한 매니저형
- 부드러운 비서형
- 친구 같은 반말형
- 존댓말형

모든 말투에서 금지되는 것:

- 감정적 위로 중심 답변
- 심리 상담처럼 이어지는 질문
- 자기돌봄 코칭
- 일정 action 없이 공감만 하는 답변

---

## 6. 플랫폼 전략

### 6.1 추천: iPhone 네이티브 앱

이 프로젝트는 iPhone 앱으로 만든다. 초기 MVP는 iOS 네이티브 기반으로 설계한다.

이유:

- 전화형 수신 화면, 알림, 오디오, 마이크 권한을 iOS 방식에 맞게 다룰 수 있다.
- SwiftUI로 홈, 루틴, 설정, 통화 화면을 빠르게 구성할 수 있다.
- AVFoundation으로 녹음/재생 제어를 명확하게 구현할 수 있다.
- UserNotifications로 로컬 알림 MVP를 먼저 만들 수 있다.
- 나중에 CallKit/PushKit을 검토할 때 네이티브 구조가 더 유리하다.

주의:

- iOS는 앱이 임의로 항상 전체 화면 전화 UI를 띄우는 것을 허용하지 않는다.
- MVP는 "알림 탭 후 앱 내 전화형 수신 화면"으로 시작한다.
- 홈에서 사용자가 먼저 거는 Call은 앱 안 통화 화면으로 바로 진입하므로 MVP에 포함한다.
- 실제 시스템 전화처럼 보이는 UX는 CallKit/PushKit 정책 검토 후 v2 실험으로 분리한다.
- PushKit은 단순 리마인더를 전화처럼 보이게 하는 용도가 아니다. 실제 음성 세션 연결 목적일 때만 검토한다.

### 6.2 iOS MVP 기술 기준

초기 iPhone MVP는 다음 기준으로 잡는다.

- UI: SwiftUI
- 알림: UserNotifications
- 오디오 재생/녹음: AVFoundation
- 로컬 저장: SwiftData 또는 SQLite
- 서버 연동: Supabase 또는 직접 백엔드 API
- 음성 API 호출: URLSession
- 실시간 통화 실험: LiveKit iOS SDK 또는 OpenAI Realtime WebRTC 구조 검토

### 6.3 최종 추천

```text
빠른 MVP: SwiftUI iPhone 앱 + 로컬 알림 + AVFoundation + Supabase
실시간 통화 고도화: LiveKit iOS SDK 또는 OpenAI Realtime 기반 실험
백엔드: Supabase + Edge Functions 또는 Node/FastAPI
```

---

## 7. 전체 아키텍처

### 7.1 v0 아키텍처: 가장 단순한 MVP

```text
iPhone App
  - 홈 Call 버튼
  - 루틴 설정
  - 로컬 알림
  - 전화형 수신 화면
  - TTS 음성 재생
  - 버튼 답변

Local Storage / Supabase
  - 루틴
  - 로그
  - 스누즈
```

v0 목표:

- AI 없이도 제품 UX가 되는지 확인한다.
- 사용자가 직접 매니저에게 거는 Call 흐름과 전화형 알림 흐름에 반응하는지 확인한다.
- 핵심 루틴 흐름을 만든다.

### 7.2 v1 아키텍처: 음성 인식 + 의도 처리

```text
iPhone App
  - 마이크 입력
  - 오디오 녹음 또는 streaming STT
  - TTS 재생

Backend
  - STT 요청
  - LLM 의도 분류
  - TTS 생성
  - 루틴 상태 업데이트

DB
  - 사용자
  - 루틴
  - 콜
  - 로그
  - transcript
```

v1 목표:

- 사용자의 짧은 음성 답변을 처리한다.
- LLM은 자유 대화가 아니라 의도 분류와 짧은 답변 생성에만 사용한다.

### 7.3 v2 아키텍처: 실시간 통화

```text
iPhone App
  - LiveKit room 접속
  - WebRTC audio 송수신
  - 통화 UI

Backend
  - 콜 예약
  - LiveKit token 발급
  - agent dispatch
  - tool/action 처리

Voice Agent
  - STT
  - LLM
  - TTS
  - turn detection
  - interruption handling

DB
  - 상태/로그/비용/대화 저장
```

v2 목표:

- 사용자가 말하면 AI가 멈추는 barge-in을 구현한다.
- 응답 지연을 줄인다.
- 전화 같은 실시간 대화 느낌을 만든다.

---

## 8. 추천 기술 스택

### 8.1 모바일

```text
Swift
SwiftUI
AVFoundation
UserNotifications
SwiftData 또는 SQLite
BackgroundTasks, 제한적 사용
LiveKit iOS SDK, v2부터
```

### 8.2 백엔드

선택지 A: 빠른 MVP

```text
Supabase
Supabase Auth
Supabase Postgres
Supabase Edge Functions
Supabase Storage
```

선택지 B: 더 확장 가능한 구조

```text
Node.js + NestJS
Postgres
Redis
BullMQ
Prisma
Docker
```

학생 프로젝트 추천은 선택지 A다. 별도 서버 운영 부담이 낮고, 인증/DB/API를 빠르게 만들 수 있다.

### 8.3 음성/AI

STT 후보:

- Deepgram streaming STT
- OpenAI Realtime transcription
- Whisper 계열 API

LLM 후보:

- 저비용, 저지연 모델
- JSON structured output을 안정적으로 주는 모델
- 한국어 의도 분류가 안정적인 모델

TTS 후보:

- Cartesia Sonic 계열
- Deepgram Aura 계열
- Fish Audio API
- Fish Speech/S2 로컬 모델, 비상업 실험용

실시간 통화 후보:

- LiveKit Agents
- OpenAI Realtime API

### 8.4 초기 추천 조합

MVP v0:

```text
SwiftUI iPhone 앱 + Supabase + 로컬 알림 + 사전 생성 TTS 파일
```

MVP v1:

```text
SwiftUI iPhone 앱 + Supabase + Deepgram STT + 저비용 LLM + Cartesia/Deepgram/Fish Audio TTS
```

MVP v2:

```text
SwiftUI iPhone 앱 + LiveKit iOS SDK + Voice Agent + STT/LLM/TTS provider 교체 가능 구조
```

---

## 9. 앱 화면 설계

코딩 전에 먼저 확정할 것은 예쁜 디자인이 아니라 화면 흐름이다. 이 앱의 핵심은 "AI 매니저와 통화하는 경험"이므로 홈 화면을 생산성 대시보드처럼 만들지 않는다.

기본 화면 흐름:

```text
홈
-> 사용자가 먼저 Call
-> 통화 화면
-> 로그/설정
```

예약 루틴 콜 흐름:

```text
예약 시간 도착
-> 일반 알림 발생, 초기 MVP는 로컬 알림
-> 사용자가 알림 탭
-> 앱 안 수신 화면
-> 받기
-> 통화 화면
-> 로그/설정
```

주요 화면:

1. 홈
2. 루틴 생성/수정
3. 전화 수신 화면
4. 통화 화면
5. 로그 화면
6. 기억 관리 화면
7. 설정 화면
8. 보이스 선택 화면

### 9.1 홈 화면

목적:

- 사용자가 먼저 AI 매니저에게 전화 걸기
- 다음 콜 시간 확인
- 설정으로 진입

표시 요소:

- 흰색 기반의 미니멀한 배경
- 상단 우측 설정 아이콘
- 중앙의 선택된 AI 매니저 프로필 원형 아이콘
- 매니저 이름
- 중앙 하단의 큰 Call 버튼 하나
- 하단의 작은 다음 예정 콜 문구

예:

```text
[설정 아이콘]

      [매니저 프로필 원]
      Morgan

          [Call]

다음 콜 23:30 · 취침 루틴
```

홈에서 빼야 할 것:

- 오늘 루틴 전체 리스트
- 완료율
- 통계 그래프
- 체크박스 여러 개
- 복잡한 카드
- AI 채팅창
- 큰 설정 버튼들
- 과한 설명 문구

홈의 정체성:

```text
홈은 오늘 할 일 목록이 아니다.
홈은 내 매니저에게 바로 연결되는 전화기다.
```

사용자가 Call을 누르면 앱 내 통화 화면으로 바로 들어간다.

예:

```text
User:
오늘 뭐 남았어?

AI:
남은 건 과제 40분, 취침 루틴 하나야.
```

### 9.2 루틴 생성/수정 화면

필드:

- 루틴 이름
- 루틴 유형
- 반복 요일
- 시간
- 예상 소요 시간
- 우선순위
- 스누즈 허용 여부
- 최대 스누즈 횟수
- 범위 축소 허용 여부
- 활성/비활성

루틴 유형:

- sleep
- study
- exercise
- hydration
- custom

### 9.3 수신 화면

전화처럼 보여야 하는 핵심 화면이다.

표시 요소:

- 개인 매니저 이름
- 매니저 프로필 원형 이미지
- 루틴 이름
- 현재 시간
- 받기 버튼
- 거절 버튼
- 나중에 버튼
- 진동/벨소리

상태:

- ringing
- connecting
- missed
- declined

### 9.4 통화 화면

표시 요소:

- 매니저 이름과 프로필
- AI 상태: 말하는 중 / 듣는 중 / 처리 중
- 루틴 이름
- 통화 시간
- 종료 버튼
- 음소거 버튼
- 텍스트 transcript, 선택 사항
- 빠른 버튼: 알겠어, 10분 뒤, 스킵, 시간 줄이기, 우선순위 보기

중요:

- 음성 인식이 실패해도 빠른 버튼으로 처리 가능해야 한다.
- 통화 UI에서 긴 설명을 넣지 않는다.

### 9.5 로그 화면

표시 요소:

- 날짜별 루틴 기록
- 완료/스킵/스누즈
- 미응답 기록
- 스누즈 횟수
- 콜 기록
- 간단한 통계, 단 홈에는 노출하지 않는다.

예:

```text
6월 22일
- 취침 루틴: 스누즈 1회 후 완료
- 운동: 스킵
- 과제: 완료
```

### 9.6 설정 화면

항목:

- 루틴 관리
- 시간 설정
- 스누즈 설정
- Manager Voice
- 알림 권한 상태
- 마이크 권한 상태
- 보이스 선택
- 말투 선택
- transcript 저장 여부
- 내 정보 / 기억 관리
- 로그
- 데이터 삭제
- 로그 내보내기
- 개인정보 안내

말투 선택 옵션:

- 짧고 딱딱한 매니저형
- 부드러운 비서형
- 친구 같은 반말형
- 존댓말형

말투는 표현 방식만 바꾼다. 어떤 말투를 선택해도 AI의 역할은 상담봇이 아니라 개인 일정 매니저다.

### 9.7 보이스 선택 화면

목적:

- 사용자가 인앱에서 AI 매니저와 보이스 모델을 선택한다.
- 선택된 매니저는 홈 중앙에 표시된다.

진입:

```text
Settings
-> Manager Voice
-> 보이스 목록
-> 미리듣기
-> 선택
```

표시 항목:

- 기본 매니저 A
- 기본 매니저 B
- 직접 고르기
- 미리듣기
- 현재 선택 상태

저장:

- 선택한 provider, voice_id, voice_name은 `user_voice_settings`에 저장한다.
- 선택한 기본 매니저는 `users.selected_assistant_id`에 저장한다.

### 9.8 내 정보 / 기억 관리 화면

목적:

- AI가 일정 관리를 위해 기억하는 정보를 사용자가 직접 확인하고 수정/삭제한다.

표시 항목:

- 선호 시간대
- 반복 루틴 패턴
- 자주 미루는 루틴
- 자주 선택하는 스누즈 시간
- 루틴별 성공/실패 패턴
- 일정 변경 선호
- 우선순위 판단 기준

가능한 작업:

- 항목 수정
- 항목 삭제
- 전체 기억 삭제
- 저장 전 확인 설정 on/off

중요:

- 감정 고백 전문, 상담성 대화, 민감한 심리 상태는 기억 항목에 저장하지 않는다.
- 새 기억 후보가 생기면 저장 전에 사용자에게 확인한다.

### 9.9 샘플 화면 제작 기준

먼저 만들 샘플 화면 후보:

- 홈 화면
- 전화 수신 화면
- 통화 화면
- 보이스 선택 화면

홈 화면 샘플 이미지 프롬프트 초안:

```text
흰색 메인, 미니멀한 아이폰 앱 홈 화면.
중앙에 선택된 AI 매니저 프로필 원형 아이콘,
아래에 이름, 큰 Call 버튼 하나,
하단에 다음 예정 콜 "23:30 · 취침 루틴".
우상단 설정 아이콘.
통화 중심이지만 더 깔끔하고 일정 매니저 느낌.
```

---

## 10. 데이터 모델

### 10.1 assistant_profiles

앱 안에 미리 들어가는 기본 AI 매니저 프로필.

```sql
create table assistant_profiles (
  id uuid primary key,
  name text not null,
  description text,
  voice_provider text not null,
  voice_id text not null,
  avatar_url text,
  is_default boolean default false,
  created_at timestamptz default now()
);
```

초기에는 2~3명의 기본 매니저를 넣는다. 각 매니저는 홈 화면의 프로필 원형 아이콘, 이름, 기본 voice_id와 연결된다.

### 10.2 users

사용자 기본 정보.

```sql
create table users (
  id uuid primary key,
  email text,
  display_name text,
  timezone text not null default 'Asia/Seoul',
  bedtime_goal time,
  manager_tone text not null default 'firm_manager',
  selected_assistant_id uuid references assistant_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

manager_tone 후보:

```text
firm_manager
soft_assistant
casual_friend
polite_formal
```

### 10.3 user_voice_settings

사용자가 선택한 보이스 모델 설정.

```sql
create table user_voice_settings (
  user_id uuid primary key references users(id),
  provider text not null,
  voice_id text not null,
  voice_name text,
  updated_at timestamptz default now()
);
```

사용자는 설정의 Manager Voice 화면에서 보이스를 미리듣고 선택할 수 있다.

### 10.4 routines

사용자가 설정한 루틴.

```sql
create table routines (
  id uuid primary key,
  user_id uuid not null references users(id),
  type text not null,
  title text not null,
  days_of_week int[] not null,
  scheduled_time time not null,
  expected_duration_minutes int,
  priority int not null default 3,
  enabled boolean not null default true,
  max_snooze_count int not null default 2,
  default_snooze_minutes int not null default 10,
  allow_reduce_scope boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 10.5 routine_calls

실제로 발생한 콜 단위 기록. 홈에서 사용자가 먼저 거는 콜은 특정 루틴이 없을 수 있으므로 `routine_id`는 nullable로 둔다.

```sql
create table routine_calls (
  id uuid primary key,
  user_id uuid not null references users(id),
  routine_id uuid references routines(id),
  call_type text not null default 'scheduled_routine',
  status text not null,
  scheduled_at timestamptz not null,
  ringing_started_at timestamptz,
  answered_at timestamptz,
  ended_at timestamptz,
  missed_at timestamptz,
  snooze_count int not null default 0,
  created_at timestamptz not null default now()
);
```

call_type 후보:

```text
manual_manager
scheduled_routine
snooze
voip_experiment
```

status 후보:

```text
scheduled
ringing
accepted
declined
missed
completed
snoozed
skipped
failed
```

### 10.6 routine_logs

루틴 결과 기록.

```sql
create table routine_logs (
  id uuid primary key,
  user_id uuid not null references users(id),
  routine_id uuid references routines(id),
  call_id uuid references routine_calls(id),
  action text not null,
  note text,
  created_at timestamptz not null default now()
);
```

action 후보:

```text
completed
snoozed
skipped
rescheduled
reduced_scope
cancel_today
prioritized
updated_routine_time
missed
declined
manual_completed
```

### 10.7 snoozes

스누즈 예약.

```sql
create table snoozes (
  id uuid primary key,
  user_id uuid not null references users(id),
  call_id uuid not null references routine_calls(id),
  minutes int not null,
  next_call_at timestamptz not null,
  fired boolean not null default false,
  created_at timestamptz not null default now()
);
```

### 10.8 conversation_turns

대화 기록. transcript 저장을 끈 사용자는 저장하지 않거나 요약만 저장한다.

```sql
create table conversation_turns (
  id uuid primary key,
  user_id uuid not null references users(id),
  call_id uuid not null references routine_calls(id),
  role text not null,
  text text,
  intent text,
  confidence numeric,
  created_at timestamptz not null default now()
);
```

role:

```text
assistant
user
system
tool
```

### 10.9 provider_usage_logs

비용 추적.

```sql
create table provider_usage_logs (
  id uuid primary key,
  user_id uuid references users(id),
  call_id uuid references routine_calls(id),
  provider text not null,
  service text not null,
  model text,
  input_units numeric,
  output_units numeric,
  estimated_cost_usd numeric,
  latency_ms int,
  created_at timestamptz not null default now()
);
```

service:

```text
stt
llm
tts
realtime
```

### 10.10 privacy_consents

개인정보 동의 상태.

```sql
create table privacy_consents (
  id uuid primary key,
  user_id uuid not null references users(id),
  consent_type text not null,
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);
```

consent_type:

```text
save_transcripts
save_schedule_memory
calendar_access
health_access
usage_analytics
```

### 10.11 schedule_memories

일정 관리를 위해 저장하는 기억. 감정 기록이 아니라 스케줄 조정에 필요한 정보만 저장한다.

```sql
create table schedule_memories (
  id uuid primary key,
  user_id uuid not null references users(id),
  memory_type text not null,
  value jsonb not null,
  source_turn_id uuid references conversation_turns(id),
  confirmed_by_user boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

memory_type 후보:

```text
preferred_time_window
frequently_delayed_routine
routine_pattern
common_snooze_duration
routine_success_failure_pattern
reschedule_preference
priority_rule
```

저장할 것:

```text
선호 시간대
자주 미루는 루틴
반복되는 일정 패턴
자주 선택하는 스누즈 시간
루틴별 성공/실패 패턴
일정 변경 선호
우선순위 판단 기준
```

저장하지 않을 것:

```text
감정 고백 전문
상담성 대화
민감한 심리 상태
불필요한 사적인 말
```

### 10.12 memory_confirmation_requests

기억 후보가 생겼을 때 사용자에게 확인하기 위한 테이블.

```sql
create table memory_confirmation_requests (
  id uuid primary key,
  user_id uuid not null references users(id),
  proposed_memory_type text not null,
  proposed_value jsonb not null,
  prompt text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
```

status 후보:

```text
pending
accepted
rejected
expired
```

---

## 11. API 설계

### 11.1 루틴 API

```http
GET /routines
POST /routines
GET /routines/:id
PATCH /routines/:id
DELETE /routines/:id
```

### 11.2 콜 API

```http
POST /manager-calls
POST /routine-calls
GET /routine-calls/:id
POST /routine-calls/:id/answer
POST /routine-calls/:id/decline
POST /routine-calls/:id/end
POST /routine-calls/:id/snooze
POST /routine-calls/:id/skip
POST /routine-calls/:id/complete
POST /routine-calls/:id/reschedule
POST /routine-calls/:id/reduce-scope
POST /routine-calls/:id/cancel-today
POST /routine-calls/:id/prioritize
POST /routine-calls/:id/update-routine-time
```

`POST /manager-calls`는 홈 화면의 Call 버튼으로 시작되는 사용자 발신 콜을 만든다. 이 콜은 `call_type = manual_manager`이고 `routine_id = null`일 수 있다.

예:

```json
{
  "call_type": "manual_manager",
  "entry_point": "home_call_button"
}
```

### 11.3 음성 API

```http
POST /voice/stt
POST /voice/intent
POST /voice/tts
POST /voice/respond
```

`/voice/respond`는 STT 결과와 루틴 컨텍스트를 받아 다음 행동과 AI 답변을 반환한다.

요청:

```json
{
  "call_id": "uuid",
  "transcript": "10분 뒤에 다시 알려줘",
  "context": {
    "routine_type": "sleep",
    "routine_title": "취침 루틴",
    "scheduled_at": "2026-06-22T23:30:00+09:00",
    "snooze_count": 0
  }
}
```

응답:

```json
{
  "intent": "snooze",
  "confidence": 0.94,
  "action": {
    "type": "schedule_snooze",
    "minutes": 10
  },
  "assistant_reply": "응, 10분 뒤에 다시 부를게."
}
```

스케줄 조정 요청:

```json
{
  "call_id": "uuid",
  "transcript": "오늘 너무 피곤해",
  "context": {
    "routine_type": "exercise",
    "routine_title": "운동 20분",
    "scheduled_at": "2026-06-23T21:00:00+09:00",
    "remaining_routines": ["과제 40분", "취침 루틴"],
    "snooze_count": 0
  }
}
```

스케줄 조정 응답:

```json
{
  "intent": "cancel_today",
  "confidence": 0.88,
  "action": {
    "type": "cancel_today",
    "routine_id": "uuid"
  },
  "secondary_action": {
    "type": "update_routine_time",
    "routine_type": "sleep",
    "offset_minutes": -30
  },
  "assistant_reply": "오늘 운동은 제외하고 취침 루틴을 30분 앞당길게.",
  "memory_candidate": null
}
```

### 11.4 LiveKit v2 API

```http
POST /livekit/token
POST /livekit/dispatch-agent
POST /livekit/end-room
```

`/livekit/token` 응답:

```json
{
  "room_name": "routine-call-abc",
  "token": "jwt",
  "url": "wss://..."
}
```

### 11.5 기억 관리 API

```http
GET /memories
PATCH /memories/:id
DELETE /memories/:id
DELETE /memories
POST /memory-confirmations
POST /memory-confirmations/:id/accept
POST /memory-confirmations/:id/reject
```

기억 확인 요청:

```json
{
  "proposed_memory_type": "preferred_time_window",
  "proposed_value": {
    "routine_type": "exercise",
    "preferred_time": "evening"
  },
  "prompt": "운동은 저녁 시간대로 기억해둘까?"
}
```

### 11.6 매니저/보이스 API

```http
GET /assistant-profiles
GET /voice-settings
PATCH /voice-settings
PATCH /users/me/selected-assistant
POST /voice/preview
```

`/voice/preview`는 보이스 선택 화면의 미리듣기에 사용한다.

보이스 설정 요청:

```json
{
  "provider": "cartesia",
  "voice_id": "voice_abc",
  "voice_name": "기본 매니저 A"
}
```

---

## 12. 음성 처리 설계

### 12.1 v1 음성 흐름

```text
1. 콜 시작
2. 서버가 루틴 컨텍스트로 안내 문장 생성
3. TTS 생성
4. 앱에서 음성 재생
5. 사용자 답변 녹음
6. STT로 텍스트 변환
7. 의도 분류
8. 감정 표현처럼 보이는 발화도 일정 조정 신호로 변환
9. action 실행
10. 기억 후보가 있으면 저장 전 확인
11. 확인 답변 TTS 재생
12. 콜 종료
```

### 12.2 v2 실시간 음성 흐름

```text
1. 앱이 LiveKit room 입장
2. agent도 room 입장
3. 사용자 오디오 stream
4. STT가 interim/final transcript 생성
5. turn detection으로 사용자 발화 종료 판단
6. LLM이 짧은 답변과 tool call 생성
7. TTS가 streaming audio 생성
8. 사용자가 말하면 TTS 중단
9. 사용자의 발화를 일정 action으로 변환
10. action 적용
11. 기억 후보 확인
12. 세션 종료
```

### 12.3 말 끊기 처리

자연스럽게 느껴지려면 사용자가 말할 때 AI 음성이 멈춰야 한다.

구현 방식:

- 앱 또는 agent에서 VAD로 사용자 음성 시작 감지
- TTS 재생 중이면 즉시 stop
- 현재 assistant utterance를 interrupted 상태로 기록
- 사용자 발화를 우선 처리

### 12.4 턴 종료 판단

초기에는 간단하게 처리한다.

```text
사용자 음성이 700ms 이상 멈춤
또는 STT speech_final true
또는 사용자가 빠른 버튼 클릭
```

향후에는 provider의 endpointing/turn detection 기능을 쓴다.

### 12.5 낮은 confidence 처리

의도 분류 confidence가 낮으면 바로 action을 실행하지 않는다.

예:

```text
User:
조금 있다가.

AI:
10분 뒤에 다시 부르면 될까?
```

버튼 fallback:

```text
[알겠어] [10분 뒤] [스킵]
```

스케줄 조정 fallback:

```text
[10분 뒤] [오늘 스킵] [시간 줄이기] [우선순위 보기]
```

### 12.6 감정 표현 처리

사용자의 발화가 감정 표현처럼 보여도 AI는 감정 분석이나 상담을 하지 않는다. 발화는 일정 조정 intent로만 해석한다.

예:

```text
"오늘 너무 피곤해" -> reduce_scope 또는 cancel_today
"하기 싫어" -> reschedule 또는 cancel_today 선택지
"집중이 안 돼" -> reduce_scope
"뭐부터 해야 돼?" -> prioritize
```

답변은 반드시 다음 중 하나로 연결한다.

- 스케줄 변경
- 루틴 상태 변경
- 다음 행동 제시
- 사용자 확인 요청

---

## 13. 의도 분류 설계

### 13.1 초기 의도 목록

```text
ack
snooze
skip
reschedule
reduce_scope
cancel_today
prioritize
ask_remaining
update_routine_time
ask_reason
repeat
stop_call
unknown
```

기존 "오늘 뭐 남았어?" 계열은 `ask_remaining`으로 통일한다. 내부 호환을 위해 `ask_today`라는 alias를 둘 수 있지만, 새 설계의 표준 intent는 `ask_remaining`이다.

### 13.2 예문

ack:

```text
알겠어
응
오케이
할게
그래
```

snooze:

```text
10분 뒤
조금 있다가
나중에 다시
5분만
좀 있다 알려줘
```

skip:

```text
오늘은 스킵
안 할래
오늘은 못 해
넘겨
```

reschedule:

```text
나중에 할래
이따가 하자
저녁으로 미뤄줘
내일로 옮겨줘
30분 뒤에 할게
```

reduce_scope:

```text
오늘 너무 피곤해
집중이 안 돼
조금만 할래
40분은 너무 길어
운동 10분만 할래
```

cancel_today:

```text
운동 빼자
오늘은 하지 말자
오늘 너무 피곤해
이건 오늘 취소
오늘 일정에서 빼줘
```

prioritize:

```text
뭐부터 해야 돼?
먼저 할 거 뭐야?
오늘 제일 중요한 게 뭐야?
순서 정해줘
우선순위 잡아줘
```

ask_remaining:

```text
오늘 뭐 남았어?
남은 일정 뭐야?
나 뭐 해야 돼?
```

update_routine_time:

```text
취침 12시로 바꿔
운동은 저녁 8시로 해줘
과제 시간 7시로 옮겨
물 마시기 알림은 오후로 바꿔
```

repeat:

```text
다시 말해줘
뭐라고?
한 번 더
```

stop_call:

```text
끊어
그만
나중에 볼게
```

### 13.3 의도 분류 출력 스키마

```json
{
  "intent": "reduce_scope",
  "confidence": 0.89,
  "snooze_minutes": null,
  "reschedule_at": null,
  "new_routine_time": null,
  "reduced_duration_minutes": 20,
  "cancel_target": null,
  "priority_target": null,
  "should_end_call": false,
  "assistant_reply": "과제 시간을 40분에서 20분으로 줄일게. 지금 시작으로 기록할까?",
  "requires_confirmation": true,
  "memory_candidate": null
}
```

스케줄 변경을 실제로 적용하기 전에는 위험도에 따라 확인을 요구한다.

확인 없이 바로 처리 가능:

- 5~15분 스누즈
- 오늘 콜 종료
- 남은 일정 조회

확인이 필요한 처리:

- 루틴 시간 영구 변경
- 특정 루틴을 오늘 일정에서 제외
- 작업 시간을 크게 줄임
- 우선순위 규칙 저장
- 일정 관리 기억 저장

### 13.4 규칙 기반 우선 처리

비용을 줄이기 위해 자주 쓰는 표현은 LLM 없이 처리한다.

규칙 예:

```text
"알겠어", "오케이", "응" -> ack
"10분", "십분" -> snooze 10
"5분", "오분" -> snooze 5
"스킵", "안 할래" -> skip
"뭐 남았" -> ask_remaining
"나중에", "이따가" -> reschedule
"뭐부터", "우선순위" -> prioritize
"시간 줄", "조금만" -> reduce_scope
"운동 빼", "오늘 취소" -> cancel_today
"12시로 바꿔", "8시로 옮겨" -> update_routine_time
```

규칙으로 안 잡히는 경우에만 LLM 의도 분류를 호출한다.

---

## 14. 프롬프트 설계

### 14.1 시스템 프롬프트 원칙

AI는 상담봇이 아니다. AI는 사용자의 개인 일정 매니저다.

목표는 위로가 아니라 일정 확인, 우선순위 정리, 실행 지시, 스케줄 조정이다. 사용자의 감정 상태를 깊게 다루지 않는다. 감정적 위로, 심리 상담, 자기돌봄 코칭을 하지 않는다.

사용자의 발화는 일정 조정 신호로 해석한다. 답변은 반드시 스케줄, 루틴 상태, 다음 행동 중 하나로 연결한다. 사용자를 설득하려고 길게 말하지 않는다. 한 번에 하나의 행동만 제안한다. 의료 조언이나 정신건강 조언을 하지 않는다. 사용자의 짧은 답변을 받아 앱 action으로 변환한다.

시스템 프롬프트에 포함할 핵심 문장:

```text
너는 상담봇이 아니다.
너는 사용자의 개인 일정 매니저다.
감정적 위로, 심리 상담, 자기돌봄 코칭을 하지 않는다.
사용자의 발화는 일정 조정 신호로 해석한다.
답변은 스케줄, 루틴 상태, 다음 행동 중 하나로 연결한다.
```

### 14.2 의도 분류 프롬프트 예시

```text
너는 개인 일정 매니저 앱의 음성 명령 분류기다.
사용자의 한국어 짧은 답변을 아래 intent 중 하나로 분류해라.
사용자가 감정이나 컨디션을 말해도 상담하지 말고 일정 조정 intent로 분류해라.

intent:
- ack
- snooze
- skip
- reschedule
- reduce_scope
- cancel_today
- prioritize
- ask_remaining
- update_routine_time
- ask_reason
- repeat
- stop_call
- unknown

반드시 JSON만 출력해라.
루틴 컨텍스트:
- type: study
- title: 과제 40분
- current_snooze_count: 0
- max_snooze_count: 2
- remaining_routines: 운동 20분, 취침 루틴

사용자 발화:
"집중이 안 돼"

출력 형식:
{
  "intent": "...",
  "confidence": 0.0,
  "snooze_minutes": null,
  "reschedule_at": null,
  "new_routine_time": null,
  "reduced_duration_minutes": null,
  "cancel_target": null,
  "priority_target": null,
  "assistant_reply": "...",
  "requires_confirmation": false,
  "memory_candidate": null
}
```

### 14.3 답변 생성 규칙

- 1~2문장
- 존댓말 또는 반말 톤은 사용자 설정을 따른다.
- 죄책감을 주지 않는다.
- 과한 감정 표현을 하지 않는다.
- 감정적 위로나 상담으로 이어가지 않는다.
- 사용자의 감정 표현을 일정 조정 신호로 해석한다.
- 행동 하나만 제안한다.
- 답변은 스케줄, 루틴 상태, 다음 행동 중 하나로 끝난다.
- 애매하면 확인 질문을 한다.

예:

```text
좋아. 오늘은 스킵으로 기록할게.
```

또는:

```text
10분 뒤에 다시 부르면 될까?
```

컨디션 발화 처리 예:

```text
User:
오늘 너무 피곤해.

AI:
오늘 운동은 제외하고 취침 루틴을 30분 앞당길게.
```

```text
User:
하기 싫어.

AI:
선택지는 10분 뒤로 미루기 또는 오늘 스킵이야.
```

```text
User:
집중이 안 돼.

AI:
과제 시간을 40분에서 20분으로 줄일게. 지금 시작으로 기록할까?
```

---

## 15. 알림과 전화형 UX

### 15.1 중요한 현실 제약

iOS는 앱이 마음대로 항상 전화 화면을 띄우는 것을 허용하지 않는다. 다만 앱 안에서 사용자가 먼저 거는 Call 화면은 바로 구현할 수 있다.

특히:

- iOS는 background 실행과 VoIP 알림 정책이 엄격하다.
- 실제 전화처럼 시스템 전화 화면을 쓰려면 CallKit/PushKit 정책 검토가 필요하다.
- PushKit은 단순 알림이나 리마인더를 전화처럼 보이게 하는 용도가 아니다.
- VoIP Push는 실제 음성 통화 연결 목적일 때만 사용한다.
- VoIP Push 수신 후에는 앱이 즉시 CallKit에 incoming call을 report해야 한다.
- report하지 않으면 iOS에서 앱이 종료되거나 VoIP Push 전달이 제한될 수 있다.

따라서 MVP는 다음 방식으로 간다.

```text
초기:
홈 Call 버튼 + 앱 안 통화 화면
로컬 알림 + 앱 열리면 전화형 수신 화면

고도화:
서버/APNs Push + 앱 안 수신 화면
CallKit + PushKit + LiveKit/WebRTC 음성 세션 실험
```

### 15.2 사용자가 먼저 거는 콜

```text
홈
Call 버튼
앱 안 통화 화면
AI 매니저와 대화
로그 저장
```

이 흐름은 iOS 정책 제약이 작고 MVP에 포함한다.

예:

```text
User:
오늘 뭐 남았어?

AI:
남은 건 과제 40분, 취침 루틴 하나야.
```

### 15.3 v0 예약 루틴 콜 흐름

```text
루틴 시간 도착
앱 로컬 알림 발생
사용자 알림 탭
앱이 수신 화면으로 이동
사용자 받기
통화 UI 시작
```

### 15.4 v1 서버 기반 예약 콜 흐름

```text
서버 cron 또는 scheduled job
푸시 알림 발송
앱 수신
사용자 탭
call_id로 통화 세션 복원
```

### 15.5 스누즈 알림 흐름

```text
사용자 "10분 뒤"
서버 또는 로컬 scheduler가 next_call_at 저장
routine_calls status = snoozed
snoozes row 생성
10분 뒤 새 routine_call 생성 또는 기존 call 재활성화
```

### 15.6 v2 진짜 전화처럼 오는 콜 실험

```text
서버 예약 job
VoIP Push 발송
iOS가 앱을 백그라운드에서 깨움
앱이 즉시 CallKit에 incoming call report
iPhone 시스템 전화 수신 UI 표시
사용자가 받음
LiveKit room 또는 WebRTC 음성 세션 연결
AI 매니저와 통화
```

이 흐름은 LiveKit/WebRTC 음성 세션이 안정된 뒤 별도 실험 기능으로 검증한다. MVP 본류에는 넣지 않는다.

---

## 16. 비용 설계

### 16.1 비용이 발생하는 지점

- STT: 사용자 음성 인식
- LLM: 의도 분류/답변 생성
- TTS: AI 음성 생성
- LiveKit Cloud: 실시간 세션 사용량
- 서버/DB: Supabase, storage, function invocation

### 16.2 비용 절감 원칙

1. 짧은 통화
   - 목표 통화 시간 20~40초
   - 최대 90초 제한

2. 규칙 기반 우선 처리
   - "알겠어", "10분 뒤", "스킵"은 LLM 없이 처리

3. TTS 캐싱
   - 자주 쓰는 문장 미리 생성
   - 같은 문장은 재사용

4. transcript 선택 저장
   - 저장 비용과 개인정보 리스크 감소

5. provider usage logging
   - 콜마다 STT/LLM/TTS 비용 추정 기록

### 16.3 비용 추정 방식

실제 단가는 provider와 시점에 따라 바뀌므로, 앱 안에서는 다음 식으로 추정한다.

```text
call_cost =
  stt_audio_seconds * stt_rate_per_second
  + llm_input_tokens * input_rate
  + llm_output_tokens * output_rate
  + tts_characters * tts_rate_per_character
  + livekit_minutes * livekit_rate_per_minute
```

MVP에서는 가격을 코드에 박아두지 말고 config table로 관리한다.

---

## 17. 개인정보와 보안

### 17.1 민감 데이터

이 앱이 다룰 수 있는 데이터:

- 취침 시간
- 루틴
- 일정
- 음성 transcript
- 사용자의 생활 패턴
- 일정 관리 기억
- 나중에는 건강 데이터

### 17.2 MVP 원칙

- 처음에는 최소 데이터만 받는다.
- Health 데이터는 붙이지 않는다.
- 위치 정보는 받지 않는다.
- transcript 저장은 선택으로 둔다.
- 일정 관리 기억 저장은 사용자 확인 후 진행한다.
- 삭제 버튼을 제공한다.
- provider로 보내는 데이터는 필요한 문맥만 보낸다.

### 17.3 서버 저장 최소화

저장해도 되는 것:

```text
루틴 설정
콜 상태
스누즈/완료/스킵 로그
루틴 시간 변경
우선순위 변경
비용/latency 로그
```

선택 저장:

```text
대화 transcript
AI 답변 전문
```

확인 후 저장:

```text
선호 시간대
자주 미루는 루틴
반복되는 일정 패턴
자주 선택하는 스누즈 시간
루틴별 성공/실패 패턴
일정 변경 선호
우선순위 판단 기준
```

초기에는 저장하지 않는 것:

```text
원본 음성 파일
위치 정보
건강 데이터
전체 캘린더 본문
감정 고백 전문
상담성 대화
민감한 심리 상태
불필요한 사적인 말
```

### 17.4 삭제 정책

설정 화면에서 제공:

- 오늘 로그 삭제
- 전체 대화 기록 삭제
- 내 정보 / 기억 관리
- 일정 관리 기억 개별 삭제
- 전체 기억 삭제
- 전체 루틴 로그 삭제
- 계정 삭제

삭제 시:

- conversation_turns 삭제
- schedule_memories 삭제
- memory_confirmation_requests 삭제
- routine_logs 삭제
- routine_calls 익명화 또는 삭제
- provider_usage_logs는 개인 식별자 제거 후 보관 가능

### 17.5 메모리 저장 확인 UX

중요한 일정 관리 정보가 나오면 저장 전 확인한다.

예:

```text
User:
나 아침 운동은 못 하겠어.

AI:
운동은 저녁 시간대로 기억해둘까?
```

```text
User:
과제는 밤에 자꾸 밀려.

AI:
과제 루틴을 저녁 8시 이전으로 우선 배치해둘까?
```

사용자가 동의하면 `schedule_memories`에 저장한다. 거절하면 해당 대화는 action 처리만 하고 기억으로 남기지 않는다.

---

## 18. 개발 일정

### 18.1 1주차: 제품 뼈대

목표:

- 앱 프로젝트 생성
- 통화 중심 화면 구조 완성
- 루틴 데이터 모델 설계

작업:

- Xcode 프로젝트 생성
- SwiftUI 기본 구조 설정
- 화면 전환 구조 설정
- 미니멀 홈 화면
- 홈 Call 버튼
- 앱 안 통화 화면 진입
- 루틴 생성 화면
- 설정 화면
- 설정 안의 루틴 관리 진입 구조
- 로컬 mock 데이터

완료 기준:

- 홈은 매니저 프로필, 이름, Call 버튼, 다음 콜 문구만 중심으로 보인다.
- 사용자가 홈에서 Call을 눌러 통화 화면으로 들어갈 수 있다.
- 앱에서 루틴을 만들고 설정의 루틴 관리에서 볼 수 있다.
- 취침 루틴 시간을 설정할 수 있다.

### 18.2 2주차: 알림과 전화형 화면

목표:

- 정해진 시간에 알림이 온다.
- 알림을 누르면 전화형 수신 화면으로 이동한다.

작업:

- iOS 알림 권한 요청
- UserNotifications 기반 로컬 알림 예약
- 수신 화면 UI
- 받기/거절/나중에 버튼
- missed 상태 처리
- 예약 루틴 콜과 수동 매니저 콜의 call_type 구분

완료 기준:

- 테스트 시간으로 1분 뒤 루틴 콜을 예약할 수 있다.
- 알림 탭 시 수신 화면이 열린다.
- 거절/미응답 로그가 남는다.

### 18.3 3주차: TTS와 통화 UX

목표:

- 사용자가 받으면 AI 음성이 나온다.

작업:

- TTS provider 하나 선택
- 서버에서 TTS 생성
- AVFoundation으로 앱에서 오디오 재생
- 통화 화면 상태 표시
- 기본 문장 템플릿 생성
- 선택된 매니저의 voice_id로 TTS를 생성하는 구조 준비

완료 기준:

- 취침 콜에서 AI 음성이 재생된다.
- 홈에서 시작한 수동 Call에서도 기본 AI 음성이 재생된다.
- 재생 완료 후 사용자 답변 대기 상태가 된다.

### 18.4 4주차: STT와 짧은 음성 답변

목표:

- 사용자가 말한 짧은 답변을 텍스트로 바꾼다.

작업:

- iOS 마이크 권한
- AVFoundation 기반 짧은 녹음
- STT API 연동
- transcript 표시
- 실패 시 버튼 fallback

완료 기준:

- "알겠어", "10분 뒤", "오늘은 스킵"이 텍스트로 인식된다.
- 인식 실패 시 버튼으로 처리할 수 있다.

### 18.5 5주차: 의도 분류와 action 처리

목표:

- 음성 답변이 앱 상태 변경으로 이어진다.

작업:

- 규칙 기반 의도 분류
- LLM fallback
- JSON schema 검증
- 스누즈 예약
- 완료/스킵 로그
- 재예약 처리
- 범위 축소 처리
- 오늘 일정 제외 처리
- 우선순위 정리
- 루틴 시간 변경
- 남은 루틴 답변

완료 기준:

- "10분 뒤"라고 말하면 10분 뒤 콜이 예약된다.
- "오늘은 스킵"이라고 말하면 skipped 로그가 남는다.
- "오늘 뭐 남았어?"라고 말하면 남은 루틴을 음성으로 답한다.
- "집중이 안 돼"라고 말하면 과제 시간이 줄어든다.
- "뭐부터 해야 돼?"라고 말하면 우선순위를 정리한다.

### 18.6 6주차: 안정화와 오류 처리

목표:

- 데모 중 실패하지 않는 수준으로 안정화한다.

작업:

- 네트워크 실패 처리
- TTS 실패 fallback
- STT timeout
- LLM JSON parse 실패 처리
- duplicate call 방지
- 스누즈 최대 횟수 제한
- 상담성 응답 방지 테스트
- 일정 변경 confirmation 처리

완료 기준:

- 네트워크가 느려도 버튼 fallback으로 콜을 끝낼 수 있다.
- 같은 루틴 콜이 중복 생성되지 않는다.
- 사용자가 피곤함을 말해도 AI가 상담하지 않고 일정 조정만 제안한다.

### 18.7 7주차: 실시간 통화 실험

목표:

- LiveKit 또는 OpenAI Realtime로 실시간 통화 가능성을 검증한다.

작업:

- LiveKit room 생성
- token 발급
- iPhone 앱에서 room join
- agent process 연결
- STT/LLM/TTS pipeline 실험
- interruption 테스트
- CallKit + PushKit은 실제 음성 세션 연결이 안정된 뒤 별도 브랜치 또는 실험 화면에서만 검토

완료 기준:

- 별도 실험 화면에서 실시간 음성 대화가 가능하다.
- 사용자가 말할 때 AI 재생을 멈추는 prototype이 있다.

중요:

- 7주차 결과가 불안정하면 MVP 본류에는 넣지 않는다.
- 발표/포트폴리오에서는 "v2 확장 실험"으로 분리한다.

### 18.8 8주차: 발표/포트폴리오 완성

목표:

- 보여줄 수 있는 완성도 있는 데모를 만든다.

작업:

- 내 정보 / 기억 관리 화면
- 기억 저장 확인 UX
- 보이스 선택 화면
- 기본 매니저 2~3명 mock 데이터
- 보이스 미리듣기
- UI 정리
- 데모 데이터 세팅
- 비용 로그 화면 또는 내부 로그 정리
- 개인정보 설정 화면 완성
- 발표 자료
- 시연 스크립트

완료 기준:

- 1분짜리 데모가 안정적으로 실행된다.
- 앱의 문제 정의, 기술 구조, 한계, 다음 단계가 설명 가능하다.

---

## 19. 테스트 계획

### 19.1 기능 테스트

체크리스트:

- 홈 화면이 매니저 프로필, 이름, Call 버튼, 다음 콜 문구 중심으로 보임
- 홈에 루틴 전체 리스트, 체크박스, 통계 그래프가 노출되지 않음
- 홈 Call 버튼으로 수동 매니저 콜 시작
- 루틴 생성
- 루틴 수정
- 루틴 비활성화
- 알림 예약
- 수신 화면 진입
- 받기
- 거절
- 미응답
- TTS 재생
- STT 인식
- 스누즈
- 스킵
- 완료
- 재예약
- 범위 축소
- 오늘 일정 제외
- 우선순위 정리
- 루틴 시간 변경
- 기억 저장 확인
- 기억 수정/삭제
- 보이스 선택
- 보이스 미리듣기
- 선택한 매니저가 홈에 표시됨
- 로그 저장
- 데이터 삭제

### 19.2 음성 테스트 문장

반드시 테스트할 문장:

```text
알겠어
오케이
응 할게
10분 뒤
십분만
5분만 더
오늘은 스킵
안 할래
오늘 뭐 남았어?
오늘 너무 피곤해
하기 싫어
집중이 안 돼
뭐부터 해야 돼?
운동 빼자
취침 12시로 바꿔
나 아침 운동은 못 하겠어
다시 말해줘
끊어
```

### 19.3 오류 테스트

- 마이크 권한 거부
- 알림 권한 거부
- 네트워크 끊김
- TTS provider 실패
- STT provider 실패
- LLM 응답 JSON 깨짐
- 앱 background 상태
- 같은 시간에 여러 루틴 존재
- 수동 매니저 콜처럼 routine_id가 없는 콜
- 스누즈 반복
- 감정 표현 입력 시 상담성 답변 생성
- 기억 후보가 사용자 확인 없이 저장됨
- 루틴 시간 변경이 확인 없이 영구 적용됨
- VoIP Push를 단순 리마인더처럼 쓰는 설계가 섞임

### 19.4 데모 테스트

데모 전 체크:

- 홈이 Call 중심으로 보이는가
- 테스트 루틴 시간이 현재 시각 + 1분으로 설정되어 있는가
- 알림 권한이 켜져 있는가
- 마이크 권한이 켜져 있는가
- API key가 정상인가
- fallback 버튼이 보이는가
- 로그가 저장되는가
- 선택된 매니저와 보이스가 홈/통화 화면에 반영되는가
- 상담성 답변 대신 일정 조정 답변이 나오는가
- 기억 저장 확인 문구가 보이는가

---

## 20. 리스크와 대응

### 20.1 전화처럼 항상 울리지 않을 수 있음

리스크:

- OS 정책 때문에 전체 화면 수신 UX가 제한될 수 있다.
- PushKit을 단순 알림처럼 쓰면 iOS 정책과 충돌할 수 있다.

대응:

- MVP에서는 알림 탭 후 전화형 화면으로 진입.
- 사용자가 먼저 거는 Call은 앱 안 통화 화면으로 구현.
- CallKit/PushKit은 LiveKit/WebRTC 음성 세션이 안정된 뒤 v2 실험으로만 검토.
- "실제 전화"라는 표현을 피하고 "앱 내 통화 UX"로 정의.

### 20.2 음성 지연이 길 수 있음

리스크:

- STT -> LLM -> TTS 순차 처리로 반응이 느려질 수 있다.

대응:

- 짧은 문장 사용.
- 규칙 기반 intent 우선 처리.
- TTS 캐싱.
- v2에서 streaming STT/TTS 도입.
- 최대 대기 시간 초과 시 버튼 fallback.

### 20.3 한국어 TTS 품질이 기대보다 낮을 수 있음

리스크:

- provider마다 한국어 자연스러움 차이가 크다.

대응:

- 최소 3개 provider 샘플 테스트.
- 10개 고정 문장으로 블라인드 비교.
- MVP에서는 목소리 품질보다 통화 흐름 안정성을 우선.

### 20.4 비용이 커질 수 있음

리스크:

- 실시간 음성 세션은 사용 시간이 늘면 비용이 증가한다.

대응:

- 콜 최대 시간 제한.
- 하루 콜 수 제한.
- 캐싱.
- provider_usage_logs로 비용 추정.
- 실시간 통화는 v2 실험으로 분리.

### 20.5 개인정보 부담

리스크:

- 생활 루틴, 수면, 일정, 음성 transcript, 일정 관리 기억은 민감하다.

대응:

- 초기에는 캘린더/Health 제외.
- transcript 저장 opt-in.
- 일정 관리 기억은 저장 전 확인.
- 감정 고백 전문과 상담성 대화는 저장하지 않음.
- 삭제 기능 제공.
- provider로 보내는 context 최소화.

### 20.6 역할 이탈 리스크

리스크:

- 사용자가 피곤함, 무기력, 하기 싫음 같은 말을 했을 때 AI가 상담봇처럼 길게 위로할 수 있다.

대응:

- 시스템 프롬프트에 "상담봇이 아니다"를 명시.
- 답변을 스케줄/루틴 상태/다음 행동 중 하나로 끝내도록 제한.
- 테스트 문장에 컨디션 표현을 포함.
- 상담성 답변이 나오면 실패 케이스로 기록.

### 20.7 Fish Speech 라이선스

리스크:

- Fish Speech/S2 계열은 연구/비상업 사용과 상업 사용 조건이 다르다.

대응:

- 학교 과제/개인 포트폴리오에서는 실험 후보.
- 앱스토어 출시, 구독, 광고, 외부 사용자 운영 시 Fish Audio API 또는 별도 상업 라이선스 검토.
- 상업화 전 법적 검토 필요.

---

## 21. provider 검증 계획

### 21.1 STT 검증

검증 기준:

- 한국어 짧은 발화 인식률
- "십분", "10분" 처리
- 주변 소음에서 인식률
- 응답 속도
- streaming 지원 여부
- 비용

테스트 문장:

```text
10분 뒤에 다시 알려줘
오늘은 스킵할게
오늘 뭐 남았어?
응 알겠어
다시 말해줘
```

### 21.2 TTS 검증

검증 기준:

- 한국어 자연스러움
- 짧은 문장 반응 속도
- 상담/위로처럼 들리지 않는 일정 매니저 톤
- 비용
- streaming 지원
- 상업 사용 조건

테스트 문장:

```text
지금 잘 시간이야. 내일 오전 일정이 있어서 지금 자는 게 좋아.
응, 10분 뒤에 다시 부를게.
좋아. 오늘은 스킵으로 기록할게.
과제 하나, 운동 20분, 그리고 취침 루틴이 남았어.
오늘 운동은 제외하고 취침 루틴을 30분 앞당길게.
과제 시간을 40분에서 20분으로 줄일게. 지금 시작으로 기록할까?
```

### 21.3 LLM 검증

검증 기준:

- JSON 출력 안정성
- 한국어 의도 분류 정확도
- 스케줄 조정 intent 분류 정확도
- 상담성 응답 회피
- 낮은 latency
- 비용
- hallucination 적음

테스트:

- 100개 짧은 발화 데이터셋 생성
- intent label 수동 작성
- 모델별 accuracy 측정
- 평균 latency 측정

---

## 22. 데모 시나리오

### 22.1 1분 데모

준비:

- 기본 매니저 mock 데이터 2명 설정
- 홈에 선택된 매니저가 표시되도록 설정
- 현재 시간 + 1분으로 취침 루틴 예약
- 내일 9시 일정 mock 데이터 설정
- transcript 저장 on
- 기억 관리 화면에 기존 선호 시간대 mock 데이터 설정

시연:

```text
1. 홈에서 매니저 프로필, 이름, Call 버튼, 다음 콜을 보여준다.
2. Call 버튼을 눌러 사용자가 먼저 매니저에게 연결한다.
3. 사용자가 "오늘 뭐 남았어?"라고 말한다.
4. AI가 "남은 건 과제 40분, 취침 루틴 하나야."라고 답한다.
5. 홈으로 돌아와 다음 콜이 1분 뒤임을 보여준다.
6. 알림이 온다.
7. 앱 수신 화면에서 받기를 누른다.
8. AI가 말한다.
   "지금 잘 시간이야. 내일 9시에 일정 있어서 지금 자는 게 좋아."
9. 사용자가 말한다.
   "10분 뒤에 다시 알려줘."
10. AI가 답한다.
   "응, 10분 뒤에 다시 부를게."
11. 이어서 사용자가 말한다.
   "오늘 너무 피곤해."
12. AI가 답한다.
   "오늘 운동은 제외하고 취침 루틴을 30분 앞당길게."
13. 로그 화면에서 manual call/snooze/cancel_today/update_routine_time 기록을 보여준다.
14. 내 정보 / 기억 관리 화면에서 저장된 일정 관리 기억을 보여준다.
```

### 22.2 발표에서 강조할 점

- 실제 전화망을 쓰지 않아 비용/규제 부담을 줄였다.
- 홈은 루틴 대시보드가 아니라 AI 매니저에게 연결되는 전화기다.
- 사용자의 하루 일정 관리라는 좁은 문제에 집중했다.
- 자유 대화 대신 상태 머신과 intent 처리로 안정성을 확보했다.
- AI 역할을 상담봇이 아니라 개인 일정 매니저로 제한했다.
- 감정 표현은 상담이 아니라 스케줄 조정 신호로 처리한다.
- 나중에 LiveKit/Realtime 기반 실시간 통화로 확장 가능하다.
- 개인정보를 최소 수집 구조로 설계했다.

---

## 23. 구현 우선순위

### 23.1 반드시 먼저 만들 것

1. 미니멀 홈 화면
2. 홈 Call 버튼과 수동 매니저 콜
3. 루틴 생성
4. 알림 예약
5. 전화형 수신 화면
6. 받기/거절/미응답
7. TTS 재생
8. 스누즈/완료/스킵/일정 조정 로그

### 23.2 그 다음 만들 것

1. STT
2. 의도 분류
3. LLM fallback
4. 스케줄 조정 intent
5. 오늘 남은 루틴 질의
6. 내 정보 / 기억 관리
7. 보이스/매니저 선택
8. 비용 로그

### 23.3 마지막에 실험할 것

1. LiveKit
2. 실시간 interruption
3. streaming TTS
4. CallKit + PushKit incoming call
5. 캘린더 연동
6. Health 연동

---

## 24. 최종 MVP 정의

MVP는 다음 문장을 만족하면 완성으로 본다.

```text
홈은 선택된 AI 매니저 프로필, 이름, Call 버튼, 다음 콜만 중심으로 보여주고,
사용자가 먼저 Call을 눌러 AI 매니저에게 남은 일정을 물을 수 있으며,
사용자가 취침/운동/과제 루틴을 설정하면, 정해진 시간에 일반 알림을 통해 앱 안 수신 화면으로 진입하고,
사용자가 받으면 AI 개인 일정 매니저가 짧게 다음 행동을 지시하며,
사용자가 "10분 뒤", "오늘 너무 피곤해", "뭐부터 해야 돼?"라고 말하면
스누즈, 일정 제외, 범위 축소, 우선순위 정리가 처리되고,
로그와 내 정보 / 기억 관리 화면에서 그 결과를 확인할 수 있다.
```

이 범위 안에서는 충분히 구현 가능하다. 핵심은 처음부터 완전한 AI 통화 앱을 만드는 것이 아니라, 하나의 일정 관리 콜을 끝까지 안정적으로 완성하는 것이다.

---

## 25. 참고 문서

기술 선택 전 확인할 공식 문서:

- OpenAI Realtime API: https://platform.openai.com/docs/guides/realtime
- LiveKit Agents: https://docs.livekit.io/agents/
- Deepgram live streaming STT: https://developers.deepgram.com/docs/live-streaming-audio
- Cartesia docs: https://docs.cartesia.ai/
- Apple CallKit: https://developer.apple.com/documentation/callkit
- Apple PushKit VoIP notifications: https://developer.apple.com/documentation/pushkit/responding-to-voip-notifications-from-pushkit
- Fish Speech repository/license: https://github.com/fishaudio/fish-speech
