import { gql, useMutation } from '@apollo/client';

const CONTACT_MUTATION = gql`
    mutation createSubmission($clientMutationId: String!, $email: String!, $fullName: String!, $message: String!, $phoneNumber: String!) {
    createSubmission(
        input: {clientMutationId: $clientMutationId, email: $email, fullName: $fullName, message: $message, phoneNumber: $phoneNumber}
    ) {
            clientMutationId
            data
            success
        }
    }
`;

export const UserContactMutation = () => {
    const [ createAbout, mutationResults ] = useMutation(CONTACT_MUTATION);

    const registerMutation = ( fullName, email, phoneNumber, message ) => {
		createAbout({
            variables: {
                clientMutationId: 'Example',
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                message: message
            }
        })
	};
    return { registerMutation, results: mutationResults };
}
