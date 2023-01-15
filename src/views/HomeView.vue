<script setup>
    import svgMap from "svgmap";
    import { ref, watch } from "vue"
    import { clientCovid } from "../axios"
    import formatDate from "../common/formatDate"

    const covidStats = ref(null)
    const isLoading = ref(false)

    const fetchData = async () => {
        isLoading.value = true
        const data = await clientCovid.get("/stats")
        covidStats.value = data?.data?.data
        isLoading.value = false
    }
    fetchData()


    watch(covidStats, (covidStats) => {
        let value = {}
        let mapped = covidStats.covid19Stats.map(item => (
            value = {
                [item.country.slice(0, 2).toUpperCase()] : {
                    gdp: item.deaths,
                    change: item.confirmed
                }
            }
        ))

        let res = Object.assign({}, ...mapped )

        new svgMap({
            targetElementID: "svgMap",
            data: {
                data: {
                gdp: {
                    name: 'Total death',
                    format: '{0}',
                    thousandSeparator: ',',
                    thresholdMax: 50000,
                    thresholdMin: 1000
                },
                change: {
                    name: 'Total Confirmed',
                    format: '{0}'
                }
                },
                applyData: 'gdp',
                values: {
                    ...res,
                    BD: {gdp: 4293, change: 10.01},
                }
            }
        });

    }, { deep: true });

</script>

<template>
    <main class="posts">
        <div class="map">
            <div class="container">
                <div id="svgMap"></div>
            </div>
        </div>

        <div class="container mt-10">
            <div v-if="isLoading" class="text-center">
                <h6 class="text-red-600 text-lg font-semibold">Loading posts data...</h6>
            </div>
            <div v-else>
                <div class="text-center mb-5">
                    <h2 class="text-lg font-medium">{{ formatDate(covidStats.lastChecked) }}</h2>
                </div>
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-3" v-for="{ keyId, deaths, confirmed, lastUpdate } in covidStats.covid19Stats" :key="keyId">
                        <div class="card text-center border px-3 py-3">
                            <h2 class="text-lg font-medium">{{ keyId }}</h2>
                            <p class="text-red-700 font-semibold"><span class="font-semibold text-black">Deaths:</span> {{ deaths }}</p>
                            <p class="text-red-700 font-semibold"><span class="font-semibold text-black">Confirmed:</span> {{ confirmed }}</p>
                            <p class="text-red-700 font-semibold"><span class="font-semibold text-black">LastUpdate:</span> {{ formatDate(lastUpdate) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

