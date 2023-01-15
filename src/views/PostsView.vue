<script setup>
    import { ref, watch } from "vue"
    import { client } from "../axios"

    const posts = ref([])
    const isLoading = ref(false)
    const isDataExist = ref(false)

    const fetchPosts = async () => {
        isLoading.value = true
        const { data } = await client.get("/posts")
        posts.value = data
        isLoading.value = false
        isDataExist.value = true
    }

    fetchPosts()

    watch(posts.value, (posts) => {
        console.log('first')
    })

</script>

<template>
    <main class="posts">
        <div class="container">
            <div v-if="isLoading" class="text-center">
                <h6 class="text-red-600 text-lg font-semibold">Loading posts data...</h6>
            </div>
            <div v-else class="grid grid-cols-12 gap-5">
                <div class="col-span-3" v-for="{ id, title, body } in posts" :key="id">
                    <div class="card border px-3 py-3">
                        <h2 class="text-lg font-medium">{{ title }}</h2>
                        <p>{{ body }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

