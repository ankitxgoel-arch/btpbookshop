namespace AnkitCAP;

@odata.draft.enabled
entity Author
{
    key ID : UUID;
    Name : String(100);
    books : Association to many Books on books.author = $self;
}

entity Books
{
    key ID : UUID;
    Title : String(100);
    Description : String(100);
    Price : Integer;
    Stocks : Integer;
    author : Association to one Author;
}
