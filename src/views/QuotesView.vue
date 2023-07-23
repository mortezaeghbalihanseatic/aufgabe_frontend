<script setup>
import { ref, watch } from "vue";
import QtView from "./QtView.vue";
import axios from "axios";

const props = defineProps({
  token: String,
});


const QuoteId = ref(1);
const QuoteData = ref(null);
const isloading = ref(false);


async function fetchData() {
  isloading.value=true; 
  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost/api/quotes`, config);
    const responseData = response.data;

    if (Array.isArray(responseData)) {
      QuoteData.value = responseData;
    } else if (Array.isArray(responseData.quotes)) {
      QuoteData.value = responseData.quotes;
    } else {

    }
    isloading.value=false; 

  } catch (error) {
    isloading.value=false; 

  }
}

fetchData();

watch(QuoteId, fetchData);
</script>

<template>
  <div>
    <button @click="QuoteId++" :disabled="isloading">Fetch next Quote</button>
    <p v-if="!QuoteData">Loading ...</p>
    <pre v-else>
      <ul>
        <li v-for="Quote in QuoteData">
          

          <table>
            <tr>
              <td>{{ Quote.id }}</td>
              <td>{{ Quote.character }}</td>
              <td style="width: 200px;">{{ Quote.quote }}</td>
              <td>
                <img :src="Quote.image_url" alt="Quote Image" />
                </td>

            </tr>
          </table>
          <!-- <QtView :jsonData="Quote" /> -->

        </li>
      </ul>
    </pre>


  </div>
</template>
