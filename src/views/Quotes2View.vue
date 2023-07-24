<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  token: String,
  api: String,
});

const QuoteId = ref(1);
const QuoteData = ref(null);
const isloading = ref(false);
const message = ref(null);

async function fetchData() {
  isloading.value = true;
  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  try {
    const response = await axios.get(`${props.api}/api/otherquotes`, config);
    let responseData = response.data;

    QuoteData.value = responseData;

    message.value = "1";
  } catch (error) {
    message.value = error.message;
    isloading.value = false;
  }

  try {
    let responseData = [
      { id: null, character: "...", quote: "...", image_url: "" },
    ];
    QuoteData.value.unshift(...responseData);
    message.value = "2";
    const response2 = await axios.get(`${props.api}/api/quote`, config);
    message.value = "3";

    responseData = response2.data;

    QuoteData.value[0] = responseData;

    isloading.value = false;
  } catch (error) {
    message.value = error.message;
    isloading.value = false;
  }
}

fetchData();

watch(QuoteId, fetchData);
</script>

<template>
  <!-- <h1>{{ message }}</h1> -->
  <div class="continer">
    <div class="btncntr">
      <button @click="QuoteId++" :disabled="isloading">Fetch next Quote</button>
    </div>
    <div>
      <p v-if="!QuoteData" class="loading-message">Loading ...</p>
      <ul class="quote-list" v-else>
        <li v-for="Quote in QuoteData" :key="Quote.id">
          <table class="quote-table">
            <tr v-if="!Quote.id">
                <td>
                    loading ...
                </td>
            </tr>
            <tr class="quote-row" v-else>
              <td class="quote-cell quote-text" >
             
                <table >
                  
                  <tr >
                    <td>
                      <h3>
                        {{ Quote.id }}
                      </h3>
                      <h4>
                        {{ Quote.character }}
                      </h4>
                    </td>
                  </tr>
                  <tr>
                    <td class="quote-cell">
                      <h3>
                        {{ Quote.quote }}
                      </h3>
                    </td>
                  </tr>
                </table>
              </td>
              <td class="quote-cell">
                <img
                  :src="Quote.image_url"
                  alt="Quote Image"
                  class="quote-image"
                />
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.continer {
  width: 100%;
}

.btncntr {
  text-align: center;
  margin: 2%;
}

/* Styles for the Loading message */
.loading-message {
  font-weight: bold;
  margin-top: 10px;
}

/* Styles for the Quote list */
.quote-list {
  width: "100%";
  list-style-type: none;
}

/* Styles for the Quote table */
.quote-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto; /* Center the table horizontally */
}

/* Styles for the Quote table row */
.quote-row {
  background-color: #fff; /* Change row background color to white */
}

/* Styles for the Quote table cell */
.quote-cell {
  padding: 8px;
  white-space: pre-wrap; /* Wrap text in cells */
}

/* Styles for the Quote text cell */
.quote-text {
  width: 100%; /* Stretch the column to take all available space */
  line-height: 1.2; /* Reduce the distance between rows */
}

/* Styles for the Quote image */
.quote-image {
  /* max-width: 100px;
    max-height: 100px; */
  width: 80px;
}
</style>
