<template>

  <div class="new-coach-block">

    <ReportsQuizHeader />

    <h2>{{ coachStrings.$tr('overallLabel') }}</h2>
    <table class="new-coach-table">
      <thead>
        <tr>
          <td>{{ coachStrings.$tr('questionLabel') }}</td>
          <td>{{ coachStrings.$tr('helpNeededLabel') }}</td>
          <td>{{ $tr('avgTimeSpentLabel') }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><KRouterLink text="Question 1" :to="questionLink" /></td>
          <td>
            <LearnerProgressCount
              :count="12"
              :verbosity="1"
              icon="help"
              verb="needHelp"
            />
          </td>
          <td><TimeDuration :seconds="60*15" /></td>
        </tr>
        <tr>
          <td><KRouterLink text="Question 2" :to="questionLink" /></td>
          <td>
            <LearnerProgressCount
              :count="1"
              :verbosity="1"
              icon="help"
              verb="needHelp"
            />
          </td>
          <td><TimeDuration :seconds="60*4" /></td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>

  import imports from './imports';
  import ReportsQuizHeader from './ReportsQuizHeader';

  export default {
    name: 'ReportsQuizQuestionListPage',
    components: {
      ReportsQuizHeader,
    },
    mixins: [imports],
    data() {
      return {
        lessonName: 'Lesson A',
      };
    },
    computed: {
      questionLink() {
        return this.newCoachRoute('ReportsQuizQuestionPage');
      },
    },
    methods: {
      goTo(page) {
        this.$router.push({ name: 'NEW_COACH_PAGES', params: { page } });
      },
    },
    $trs: {
      avgTimeSpentLabel: 'Average time spent',
    },
  };

</script>


<style lang="scss" scoped>

  .stats {
    margin-right: 16px;
  }

</style>
