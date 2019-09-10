<template>
  <div>
    <svg style="display:none;">
      <defs>
        <g
          id="cross"
          viewBox="0 0 24 24"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g fill-rule="nonzero" fill="#000000">
            <path
              d="M12,10.5857864 L6.20710678,4.79289322 L6.20710678,4.79289322 C5.81658249,4.40236893 5.18341751,4.40236893 4.79289322,4.79289322 L4.79289322,4.79289322 L4.79289322,4.79289322 C4.40236893,5.18341751 4.40236893,5.81658249 4.79289322,6.20710678 L4.79289322,6.20710678 L10.5857864,12 L4.79289322,17.7928932 L4.79289322,17.7928932 C4.40236893,18.1834175 4.40236893,18.8165825 4.79289322,19.2071068 L4.79289322,19.2071068 L4.79289322,19.2071068 C5.18341751,19.5976311 5.81658249,19.5976311 6.20710678,19.2071068 L12,13.4142136 L17.7928932,19.2071068 L17.7928932,19.2071068 C18.1834175,19.5976311 18.8165825,19.5976311 19.2071068,19.2071068 C19.5976311,18.8165825 19.5976311,18.1834175 19.2071068,17.7928932 L13.4142136,12 L19.2071068,6.20710678 C19.5976311,5.81658249 19.5976311,5.18341751 19.2071068,4.79289322 L19.2071068,4.79289322 L19.2071068,4.79289322 C18.8165825,4.40236893 18.1834175,4.40236893 17.7928932,4.79289322 L17.7928932,4.79289322 L12,10.5857864 Z"
            />
          </g>
        </g>
      </defs>
    </svg>
    <div>
      <h2 style="padding: 0 0 8px 0; border-bottom: 1px solid black;">New Trip</h2>
    </div>
    <div class="wrapper">
      <div
        class="attraction-wrapper"
        v-for="(attraction, $index) in tripAttractionsData"
        :key="attraction.attraction_id"
      >
        <div>
          <div
            style="display: inline-flex;width: 100%;justify-content: space-around;padding-bottom:8px;"
          >
            <span>
              <img
                class="attraction-picture"
                width="100%"
                height="100%"
                :src="categoriesPictures[attraction.attractionDetails.category]"
              />
            </span>
            <span>
              <span class="name">{{ attraction.attractionDetails.name}}</span>
              <span class="category">{{ attraction.attractionDetails.category }}</span>
              <div class="address">Bosbaanweg 5, Amstelveen</div>
            </span>
            <span class="actions">
              <svg
                class="icon"
                style="width: 24px;height: 24px; cursor:pointer;"
                @click="deleteAttractionFromTrip($event, $index)"
              >
                <use xlink:href="#cross" />
              </svg>
            </span>
          </div>
          <div style="display: inline-flex;">
            <div>
              <VueCtkDateTimePicker
                :only-date="true"
                v-model="attraction.attraction.date_from"
                :formatted="'YYYY-MM-DD'"
                input-size="sm"
                label="from(date)"
              />
              <VueCtkDateTimePicker
                :only-time="true"
                v-model="attraction.attraction.date_from"
                :formatted="'hh:mm'"
                input-size="sm"
                label="to(date)"
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
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-default" @click="backToMenu">back</button>
      <button class="btn btn-success" @click="CreateTrips">Create trip</button>
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
    },
    backToMenu() {
      this.$store.dispatch("emptyTripAttraction");
      this.$store.dispatch("setMenuState", "main_menu");
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




