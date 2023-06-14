# subway-website-next

### About
써브웨이의 사용법을 알려주는 서비스입니다.<br />
NextJS, Typescript, prisma, Vercel postgres를 활용했으며 vercel을 통해 배포했습니다.<br />
실제 서비스는 [여기](https://subway-website-next.vercel.app/)서 확인하실 수 있습니다.<br />
기존 써브웨이 웹사이트를 분석하고 부족한 점을 보완했으며 보완된 점은 아래와 같습니다.<br />

- 이용 방법과 메뉴, 재료를 동시에 확인하기 힘들다.
- 다양한 조합을 쉽게 확인할 수 있다.
- 누구나 원하는 조합을 추가할 수 있다.

[react와 Javascript로 만든 기존의 프로젝트](https://github.com/gouz7514/subway-website)를 Next, Typescript, Vercel을 활용해 리팩토링 및 발전시킨 서비스입니다.

> 📘 기술적인 부분에 대해서는 [README_TECHNICAL.md](./Docs/README_TECHNICAL.md)를 참고해주세요!

### Stack
[![Tech stacks](https://skillicons.dev/icons?i=ts,nextjs,vercel,prisma,jest)](https://skillicons.dev)

### Detail

#### 사용 방법 ([링크](https://subway-website-next.vercel.app/usage))
써브웨이의 사용 방법을 확인할 수 있습니다.
[swiper](https://swiperjs.com/)를 활용해 구현했으며 반응형으로 설계했습니다.
#### 재료 소개 ([링크](https://subway-website-next.vercel.app/ingredients))
써브웨이의 다양한 재료를 한 눈에 확인할 수 있습니다.<br />
공식 홈페이지(업데이트가 되지 않음)의 재료를 그대로 따 와서 실제 재료와 맞지 않을 수 있습니다.

#### 조합 추천 & 추가
**조합 추천**
써브웨이의 다양한 조합을 확인할 수 있습니다.

**조합 추가**
원하는 조합을 누구나 쉽게 추가할 수 있습니다.<br />
추가된 조합은 vercel postgres에 저장됩니다.