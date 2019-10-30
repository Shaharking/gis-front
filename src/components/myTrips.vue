<template>
  <div>
    <div class="wrapper">
      <div class="trip-wrapper" v-for="trip in trips" :key="trip.id">
        <div class="trip-group">
          <span>Trip from {{tripDatesMinMax(trip, 'date_from' , 'min') | dayFormat}} to {{ tripDatesMinMax(trip, 'date_to', 'max') | dayFormat}} - {{trip.TourAttractions.length}} attractions</span>
          <span>
            Status:
            <span style="color:green;" v-if="!trip.TripOrder">Ongoing</span>
            <span style="color:red;" v-if="trip.TripOrder !== null">Done</span>
          </span>
        </div>
        <div class="trip-details">
          <div
            v-for="attraction in trip.TourAttractions"
            :key="attraction.attraction_id"
            @click="jumpToAttraction(attractions[attraction.attraction_id])"
          >
            {{attractions[attraction.attraction_id].name}}
            -
            {{attraction.date_from | shortDate}} : {{attraction.date_to | shortDate}}
          </div>
        </div>
        <div  v-if="!trip.TripOrder">
          <div v-if="userType === 0">
            <div v-if="trip.TripOffers.length === 0">
              Hurry up, offer your bid
              <button @click="openNewBidOffer(trip.id)">Offer</button>
            </div>
            <div v-else>
              You offered {{trip.TripOffers[0].estimation_cost}} ILS,
              <button @click="openUpdateBidOffer(trip.id, trip.TripOffers[0].estimation_cost)">Update Offer</button>
            </div>
          </div>
          <div v-if="userType === 1 && trip.TripOffers.length > 0">
            You have {{trip.TripOffers.length}} open offers, 
            <button @click="openOffersModal(trip.id, trip.TripOffers)">close the offer</button>
          </div>
          <div v-if="userType === 1 && trip.TripOffers.length === 0">
            Unfortunally, no offers yet
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-secondary btn-lg" @click="backToMenu" style="margin-right:8px;">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { MapEventEmitter } from "./../emitters/map.emitter";
import PromptDialog from '../modals/PromptDialog';
import TripOffers from './TripOffers';
export default {
  data() {
    return {
      trips: []
    };
  },
  computed: {
    attractions() {
      const attractions = this.$store.getters["attractions"];
      return attractions.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {});
    },
    userType() {
      const user = this.$store.getters["user"];
      return user.user_type;
    }
  },
  mounted() {
    this.fetchTrips();
  },
  filters: {
    dayFormat: function(value) {
      if (!value) return "";
      value = dayjs(value);
      return value.format("DD/MM/YYYY");
    },
    shortDate: value => {
      return dayjs(value).format("DD/MM/YYYY HH:mm");
    }
  },
  methods: {
    backToMenu() {
      this.$store.dispatch("setMenuState", "main_menu");
    },
    tripDatesMinMax(trip, prop, func) {
      const compare = (func = "min"
        ? (a, b) => (a < b ? a : b)
        : (a, b) => (a > b ? a : b));

      if (trip.TourAttractions.length > 0) {
        const attraction = trip.TourAttractions.reduce((acc, date) => {
          acc = compare(acc, date[prop]);
          return acc;
        }, trip.TourAttractions[0][prop]);

        return attraction;
      }
      return;
    },
    fetchTrips() {
      this.$store.dispatch("getUserTrips").then(data => {
        this.trips = data;
      });
    },
    jumpToAttraction(attraction) {
      const { lat, lng } = attraction.Location;
      MapEventEmitter.$emit("map/panTo", { lat, lng });
    },
    openNewBidOffer(tripId) {
      this.$modal.show(PromptDialog, {
        title: "New trip offer",
        placeholder: "Enter your offer in ils",
      },{
        adaptive: true,
        height: 'auto'
      },{
        submit: (value) => {
          const offer = Number(value);
          const data = {
            tripId,
            cost: offer
          };
          this.$store.dispatch('createTripPriceOffer', data).then(this.fetchTrips);
        }
      });
    },
    openUpdateBidOffer(tripId, price) {
      this.$modal.show(PromptDialog, {
        title: "Update trip offer",
        placeholder: "Enter your offer in ils",
        value: price
      },{
        adaptive: true,
        height: 'auto'
      },{
        submit: (value) => {
          const offer = Number(value);
          const data = {
            tripId,
            cost: offer
          };
          this.$store.dispatch('createTripPriceOffer', data).then(this.fetchTrips);
        }
      });
    },
    openOffersModal (tripId, offers)
    {
      this.$modal.show(TripOffers, {
        offers: offers
      }, {
        adaptive: true,
        height: 'auto'
      }, {
         submit: (value) => {
           value = Number(value);
           const data = {
             tripId,
             userId: value
           };
           this.$store.dispatch('createTripUserOrder', data).then(this.fetchTrips);
         }
      })
    }
  }
};
</script>

<style scoped>
.trip-wrapper {
  padding: 8px 16px;
  border-bottom: 1px solid #e3e3e3;
}
.trip-group {
  display: flex;
  justify-content: space-between;
}

.trip-details {
  margin-top: 8px;
}

.actions {
  margin: 8px 0;
  text-align: center;
}
</style>

