<template>

  <div class="new-coach-block">

    <ReportsLearnerHeader />
    <NotificationsFilter />
    <br>

    <div>

      <NotificationCard
        icon="star"
        targetPage=""
        time="1 minutes ago"
      >
        {{ nStrings.$tr('individualCompleted', {learnerName: "Julie", itemName: "A video"}) }}
      </NotificationCard>
      <NotificationCard
        icon="clock"
        targetPage=""
        time="2 minutes ago"
      >
        {{ nStrings.$tr('individualStarted', {learnerName: "Julie", itemName: "A video"}) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="3 minutes ago"
      >
        {{ nStrings.$tr('individualCompleted', {learnerName: "Julie", itemName: "An exercise"}) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="4 minutes ago"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "A video assigned to the class"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="6 minutes ago"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "An exercise assigned to the class"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="8 minutes ago"
        learnerContext="Group A"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "A video assigned to a group"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="10 minutes ago"
        learnerContext="Group A"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "An exercise assigned to a group"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="15 minutes ago"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "Some lesson"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="star"
        targetPage=""
        time="20 minutes ago"
        contentContext="Some quiz"
      >
        {{ nStrings.$tr('individualCompleted', {
          learnerName: "Julie",
          itemName: "Some quiz"
        }) }}
      </NotificationCard>
      <NotificationCard
        icon="clock"
        targetPage=""
        time="50 minutes ago"
        contentContext="Some lesson"
      >
        {{ nStrings.$tr('individualStarted', {
          learnerName: "Julie",
          itemName: "Some quiz"
        }) }}
      </NotificationCard>
    </div>

    <KButton
      :text="coachStrings.$tr('showMoreAction')"
    />

  </div>

</template>


<script>

  import imports from './imports';
  import ReportsLearnerHeader from './ReportsLearnerHeader';
  import NotificationCard from './shared/notifications/NotificationCard';
  import { nStringsMixin } from './shared/notifications/notificationStrings';
  import NotificationsFilter from './shared/notifications/NotificationsFilter';

  export default {
    name: 'ReportsLearnerActivityPage',
    components: {
      NotificationsFilter,
      ReportsLearnerHeader,
      NotificationCard,
    },
    mixins: [imports, nStringsMixin],
    $trs: {
      resourceTitleLabel: 'Resource title',
    },
  };

</script>


<style lang="scss" scoped></style>
