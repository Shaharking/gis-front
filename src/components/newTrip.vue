<template>
  <div>
    <div class="wrapper">
      <div>
        <div
          class="attraction-wrapper"
          v-for="(attraction, $index) in tripAttractionsData"
          :key="attraction.attraction_id"
        >
          <div>
            <div>
              <img
                class="attraction-picture"
                width="100%"
                height="100%"
                :src="categoriesPictures[attraction.attractionDetails.category]"
              />
            </div>
            <div>
              <div class="name">{{ attraction.attractionDetails.name}}</div>
              <div class="category">{{ attraction.attractionDetails.category }}</div>
              <div class="address">Bosbaanweg 5, Amstelveen</div>
            </div>
          </div>
          <div>
            <div>
              <VueCtkDateTimePicker
                :only-date="true"
                v-model="attraction.attraction.date_from"
                :formatted="'YYYY-MM-DD'"
                input-size="sm"
              />
              <VueCtkDateTimePicker
                :only-time="true"
                v-model="attraction.attraction.date_from"
                :formatted="'hh:mm'"
                input-size="sm"
              />
            </div>
            <div>
              <VueCtkDateTimePicker
                :only-date="true"
                v-model="attraction.attraction.date_to"
                :formatted="'YYYY-MM-DD'"
                input-size="sm"
              />
              <VueCtkDateTimePicker
                :only-time="true"
                v-model="attraction.attraction.date_to"
                :formatted="'hh:mm'"
                input-size="sm"
              />
            </div>
          </div>
          <div class="actions">
            <input type="button" @click="deleteAttractionFromTrip($event, $index)" value="Delete" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="CreateTrips">Create trip</button>
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

import categoriesPictures from "./../utils/categoriesPictures";

export default {
  data() {
    return {
      categoriesPictures
    };
  },
  computed: {
    attractions() {
      const tripAttractions = this.$store.getters["attractions"];
      return tripAttractions;
    },
    categories() {
      const categories = this.$store.getters["categories"];
      console.log(categories);
      return categories;
    },
    tripAttractions() {
      return this.$store.getters["tripAttractions"];
    },
    tripAttractionsData() {
      return this.tripAttractions.map(attraction => {
        const attractionId = Number(attraction.attraction_id);
        const attractionObj = this.attractions.find(x => x.id === attractionId);
        return {
          attractionDetails: attractionObj,
          attraction
        };
      });
    }
  },
  methods: {
    deleteAttractionFromTrip($event, index) {
      console.log($event, index);
      this.$store.dispatch("deleteSpecificAttraction", index);
    },
    CreateTrips() {
      this.$store.dispatch("createTrip", this.tripAttractions);
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

.attraction-picture {
  width: 50px;
  height: 50px;
  margin-right: 8px;
  background-color: #0074d9;
  border-radius: 50%;
  padding: 8px;
}

.attraction-wrapper {
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  padding: 8px;
}

.attraction-wrapper:first-child {
  margin-top: 8px;
}

.date-wrapper {
  margin-bottom: 8px;
}
</style>  




