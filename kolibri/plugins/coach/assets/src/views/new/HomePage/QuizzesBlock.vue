<template>

  <div>
    <h2>{{ coachStrings.$tr('quizzesLabel') }}</h2>
    <p>
      <KRouterLink
        appearance="flat-button"
        :text="$tr('viewAll')"
        :to="newCoachRoute('ReportsQuizListPage')"
      />
    </p>
    <div>
      <ItemProgressDisplay
        name="A quiz!"
        :completedItems="10"
        :totalItems="10"
        :needHelp="3"
        :groups="[]"
      />
      <ItemProgressDisplay
        name="another"
        :completedItems="2"
        :totalItems="4"
        :needHelp="1"
        :groups="[1, 2, 3]"
      />
      <ItemProgressDisplay
        name="yet another"
        :completedItems="2"
        :totalItems="3"
        :needHelp="0"
        :groups="[1, 2]"
      />
    </div>
  </div>

</template>


<script>

  import imports from '../imports';
  import ItemProgressDisplay from './ItemProgressDisplay';

  export default {
    name: 'QuizzesBlock',
    components: {
      ItemProgressDisplay,
    },
    mixins: [imports],
    $trs: {
      viewAll: 'All quizzes',
    },
  };

</script>


<style lang="scss" scoped></style>

