using { AnkitCAP as my } from '../db/schema.cds';

@path : '/service/AnkitCAPService'
service AnkitCAPService
{
    entity Books as projection on my.Books;
    entity Author as projection on my.Author;
}

annotate AnkitCAPService.Books with @(
    odata.draft.enabled: true,
    fiori.draft.enabled: true,
    odata.draft.bypass: true,

    UI.LineItem : [

        {
            $type: 'UI.DataField',
            Label: 'Title',
            Value: title
        },
         {
            $type: 'UI.DataField',
            Label: 'Descrption',
            Value: Description
        } 
    ]
);

annotate AnkitCAPService with @requires :
[
    'authenticated-user'
];
