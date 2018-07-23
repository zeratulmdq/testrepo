import docClient from '../aws';

const TableName = 'Users';

const resolvers = {
    Query: {
        users: (_) => {
            const params = { TableName };
            return docClient.scan(params)
                .promise()
                .then(data => {
                    return data.Items;
                })
                .catch(error => console.log(error));
        },
        user: (root, { id }) => {
            const params = {
                TableName,
                Key: {
                    id
                }
            };
            return docClient.get(params)
                .promise()
                .then(data => data.Item)
                .catch(error => console.log(error));
        }
    }
}

export default resolvers;