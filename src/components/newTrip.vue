<template>
  <div class="full-height">
    <div class="wrapper">
      <div id="NewTrip">
        <p>New Trip</p>
      </div>

      <div id="firstSection">
        <p id="attractioName">attractioName</p>
        <p id="destination">destination</p>
        <p id="time">tripTime</p>
      </div>
    </div>
  </div>
</template>

<script>
/* Component
Create NewTrip.vue with template, script, style
In script - Create computed property - for tripAttractions
Create the template (html) for attraction page
v-for
@onclick
input type = date (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
input type - time
Create in folder api
trips.js
use axios to post the attraction list and information about the trip to POST /trips
Create in (Action.js) function that uses the api, 
that get the trip details and call the function that you created in the previous step.
Use @onclick for “Create new trip” button to dispatch the action that send the server the trip details ($store.dispatch)
*/

export default {
  computed: {
    attractions() {
      const tripAttractions = this.$store.getters["tripAttractions"];
      return tripAttractions;
    },
    categories() {
      const categories = this.$store.getters["categories"];
      console.log(categories);
      return categories;
    }
  }
};
</script>
   
<style>
#firstSection {
  color: black;
  background: white;
  width: 500px;
  position: relative;
  font-size: 400%;
  height: 300px;
}

#NewTrip {
  font-size: 500%;
  position: relative;
  color: black;
  text-decoration-line: underline;
}
</style>  




