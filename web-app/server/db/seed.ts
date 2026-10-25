import * as schema from './schema';
import { db, client } from ".";
import * as bcrypt from 'bcrypt';

async function main() {
    console.log('>> Starting database seeding...');

    try {
        await db.transaction(async (tx) => {
            // 1. Seed Countries with phoneFormat masks
            const [madagascar, france, mauritius, australia, spain] = (await tx.insert(schema.countries).values([
                { name: 'Madagascar', code: 'MG', telCode: '+261', phoneFormat: '+261 ## ## ### ##' },
                { name: 'France', code: 'FR', telCode: '+33', phoneFormat: '+33 # ## ## ## ##' },
                { name: 'Mauritius', code: 'MU', telCode: '+230', phoneFormat: '+230 ### ####' },
                { name: 'Australia', code: 'AU', telCode: '+61', phoneFormat: '+61 # #### ####' },
                { name: 'Spain', code: 'ES', telCode: '+34', phoneFormat: '+34 ### ## ## ##' }
            ]).returning()) as [schema.Country, schema.Country, schema.Country, schema.Country, schema.Country];

            // 2. Seed Roles (2 roles)
            const [adminRole, staffRole] = (await tx.insert(schema.roles).values([
                { name: 'Admin', notes: 'System administrator with full access' },
                { name: 'Staff', notes: 'Shelter manager' }
            ]).returning()) as [schema.Role, schema.Role];

            // 3. Seed Shelter Statuses (3 statuses)
            await tx.insert(schema.statuses).values([
                { name: 'Open', color: '#22c55e', notes: 'Shelter is currently operating normally' },
                { name: 'Almost Full', color: '#eab308', notes: 'Shelter has reached almost capacity' },
                { name: 'Closed', color: '#ef4444', notes: 'Shelter has reached maximum capacity' },
            ]);

            // 4. Seed Users (3 users with spaced telephone format)
            const saltRounds = 10;
            const hashedPassword1 = await bcrypt.hash('password123!', saltRounds);
            const hashedPassword2 = await bcrypt.hash('password456!', saltRounds);
            const hashedPassword3 = await bcrypt.hash('password789!', saltRounds);

            await tx.insert(schema.users).values([
                {
                    nickName: 'AliceAdmin',
                    telephone: '+261 34 10 222 33', // Madagascar spaced format
                    password: hashedPassword1,
                    countryId: madagascar.id,
                    roleId: adminRole.id, 
                    memberCount: 0,
                },
                {
                    nickName: 'BobManager',
                    telephone: '+33 6 12 34 56 78', // France spaced format
                    password: hashedPassword2,
                    countryId: france.id,
                    roleId: staffRole.id,
                    memberCount: 0,
                },
                {
                    nickName: 'CharlieManager',
                    telephone: '+61 4 1234 5678', // Australia spaced format
                    password: hashedPassword3,
                    countryId: australia.id,
                    roleId: staffRole.id,
                    memberCount: 0,
                },
            ]);
        });

        console.log('>> Seeding completed successfully!');
        await client.end();
        process.exit(0);
    } 
    catch (err) {
        console.error('❌ Error during seeding (rolled back):', err);
        await client.end();
        process.exit(1);
    }
}

main();
