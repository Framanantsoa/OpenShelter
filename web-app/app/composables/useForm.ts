import type { z } from 'zod'

export function useForm<S extends z.ZodType>(
    schema: S,
    initialValues: z.input<S>,
    onSubmit: (data: z.output<S>) => Promise<void>,
) {
    const values = reactive({ ...(initialValues as object) }) as z.input<S>;
    const errors = ref<Record<string, string>>({});
    const formError = ref<string | null>(null);
    const submitting = ref(false);

    function validate(): z.output<S> | null {
        errors.value = {}
        const result = schema.safeParse(values)
        if (result.success) return result.data

        for (const issue of result.error.issues) {
            const key = String(issue.path[0] ?? '_form')
            if (!(key in errors.value)) errors.value[key] = issue.message
        }
        return null
    }

    async function submit() {
        if (submitting.value) return
        formError.value = null

        const data = validate()
        if (!data) return

        submitting.value = true
        try {
            await onSubmit(data)
        } catch (e: any) {
            if (e?.statusCode === 422) {
                throw e
            }

            const err = e as { 
                data?: { statusText?: string; message?: string }; 
                statusMessage?: string;
            }
            formError.value = err.data?.statusText ?? err.data?.message ?? 'Something went wrong. Please try again.'
        } finally {
            submitting.value = false
        }
    }

    return { values, errors, formError, submitting, submit, validate }
}
