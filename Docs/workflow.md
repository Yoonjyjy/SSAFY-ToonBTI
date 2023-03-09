# Work Flow

개발 워크플로우

## Requisite

- Github flow를 준수합니다
- 원활한 개발을 위해 Gitlab Issue탭을 적극 활용해주세요
- 작업을 마치고나서 feature 브랜치를 일일히 rebase할 필요는 없습니다.
  - 하루 이상 지난 feature branch의 경우에는 **아침에 반드시 rebase** 해주세요
  - gitlab에서 알아서 rebase 해줍니다
- main, frontend, backend에 push할 수 없습니다 (maintainers 제외)
- main, frontend, backend에 force-push할 수 없습니다
- 테스트 코드를 작성해주세요
  - 만들 수 없다면 테스트 시나리오
- /\*\* 코드 주석을 작성해주세요 \*/

## Develop - Todo

1. Gitlab에 issue를 등록합니다
   - 새로운 기능일 경우, "enhancement" label을 달아주세요
   - 이미 닫힌 이슈를 보완 및 수정해야할 경우, "duplicate" label을 달아주세요
1. 등록한 issue에서 브랜치를 생성합니다
1. issue탭에서 생성한 브랜치로 작업합니다

## Develop - In progress

1. 작업 중 유용한 레퍼런스나 기술적 조언은 comment로 달아주세요
1. 코드리뷰가 필요시 MR(Merge Request)로 만들어주세요

   - "help wanted" label을 달아주세요

1. commit
   - .gitignore에 staged 할 필요없는 파일들을 등록해주세요
   - gitmessage.txt에 commit message template을 참고합니다
   - git add . && git commit

## Develop - Done

1. 작업을 완료했다면 작업브랜치를 푸시해주세요
1. Gitlab에서 MR을 생성합니다
   - Source branch (feature-branch) into Target branch (frontend or backend)
1. 리뷰 후에 Rebase 및 Merge 합니다

## Reference

- [Github flow](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)
- [Semi-linear merge](https://devblogs.microsoft.com/devops/pull-requests-with-rebase/)
- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
