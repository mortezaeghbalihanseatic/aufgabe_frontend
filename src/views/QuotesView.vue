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

async function fetchData() {
  isloading.value = true;
  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  try {
    const response = await axios.get(`${props.api}/api/quotes`, config);
    const responseData = response.data;

    QuoteData.value = responseData;

    isloading.value = false;
  } catch (error) {
    isloading.value = false;
  }
}

fetchData();

watch(QuoteId, fetchData);
</script>

<template>
  <div class="continer">
    <div class="btncntr">
      <button @click="QuoteId++" :disabled="isloading" class="fetch-button">
        Fetch next Quote
      </button>
    </div>
    <div>
      <p v-if="!QuoteData" class="loading-message">Loading ...</p>
      <ul class="quote-list" v-else>
        <li v-for="Quote in QuoteData" :key="Quote.id">
          <table class="quote-table">
            <tr class="quote-row">
              <td class="quote-cell quote-text">
                <table>
                  <tr>
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

/* Styles for the Fetch button */

.fetch-button {
  padding: 10px;

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
