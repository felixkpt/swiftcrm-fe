import ErrorBoundary from '@/components/Notifications/ErrorBoundary'
import React from 'react'

// Create a new component that throws an error
const ErrorComponent = () => {
    throw new Error("This is a test error!");
};

type Props = {}

const TestErrorBoundary = (props: Props) => {
    return (
        <ErrorBoundary>
            <ErrorComponent />
        </ErrorBoundary>
    )
}

export default TestErrorBoundary