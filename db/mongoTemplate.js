{
  review_id: {
    rating: integer,
    summary: string,
    recommend: bool,
    response: string,
    body: string,
    date: string,
    reviewer_name: string,
    helpfulness: integer,
    photos: [
      {url: string, review_id: integer}
    ]
    product_id: {
      ratings: {
        5: integer,
        4: integer,
        3: integer,
        2: integer,
        1: integer
      },
      recommend: {
        true: {
          5: integer,
          4: integer,
          3: integer,
          2: integer,
          1: integer
        },
        false: bool
      }
    }
  }

  characteristics: {
    value: [
      {name: string,
      value: float}
    ]
  }
}