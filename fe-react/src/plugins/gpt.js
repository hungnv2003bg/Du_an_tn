import axiosGpt from "./axiosGpt";


export const useGpt = {
    actions: {
        async chat(paylay) {
            const config = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: paylay ? paylay : "Xin chào!",
                    },
                ],
                temperature: 0,
                max_tokens: 3000,

            }
            const response = await axiosGpt.post('/v1/chat/completions', config)
            return response
        },
    },
}
