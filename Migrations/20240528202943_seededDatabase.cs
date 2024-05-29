using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Tabloid.Migrations
{
    /// <inheritdoc />
    public partial class seededDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    FollowedUserId = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_FollowedUserId",
                        column: x => x.FollowedUserId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    HeaderImage = table.Column<string>(type: "text", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PublicationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    DateOfComment = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reactions_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reactions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagName = table.Column<string>(type: "text", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eec044a3-938f-4fbe-9cef-686ae5750145", "AQAAAAIAAYagAAAAEDX7YKx35LoC9dM9FXtvAHRsbLnixzTssg9uaUzd9P3uY3qO4uQxo4MXN9HQQ1YCaQ==", "7d81e139-d754-464b-937b-3c0727797984" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3dd5af65-9227-4976-9874-dea6f1a50b24", "AQAAAAIAAYagAAAAENtB5HzEIw+lDTFZnHe+F15xeSpqK5tD3KK8GyWt1BGIT80xT2y6zJNnDeqam+YhVA==", "1d8e1c5a-b68b-405c-aeff-3c42b51dd0fa" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eee2fcfe-4f18-4078-9561-dc3da7915c9b", "AQAAAAIAAYagAAAAEDajmh+h3debAxKX2Q+8m2Fpn8f+UOkB9xF9ZBMfFlp6pCOMZrFCGLCsIMGx/Vqo0g==", "52b99944-8560-4ad3-9806-af09ca546ad4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9f991b3a-e27c-4275-b3e8-dab351db3cb3", "AQAAAAIAAYagAAAAEJUN0Y7OyspBuna4qL2GpbZKYRX5TcJqRIyi983FDsfRDHIQwKINV4lCpobWLMDYqw==", "a7d50c33-5d88-4bef-9caa-fe01e0b65dc3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "13fe17db-af1d-403f-b0fb-6a132247f022", "AQAAAAIAAYagAAAAENgVA5WElx0lDdi5lsesiu7Az7CBrGiIzo2BT1F9AWqK9+TJx/00ljzg6OeKMNkouQ==", "64092e3b-a812-44fc-a97c-d4199e150aaf" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d0a5e975-4843-4ee6-8252-fb40a280d44b", "AQAAAAIAAYagAAAAEF6LwuWbwC+Ck+WbP9mLwqphGlvvkzXvvNwCntA802D59ykpcmcKHzXy4UIObeWPsA==", "ca73997b-a6ac-476c-a02b-985853c7d7b0" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Category 1" },
                    { 2, "Category 2" },
                    { 3, "Category 3" },
                    { 4, "Category 4" },
                    { 5, "Category 5" }
                });

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Id", "EndDate", "FollowedUserId", "StartDate", "UserProfileId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 27, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(520), 2, new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(500), 1 },
                    { 2, new DateTime(2024, 6, 27, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(560), 3, new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(550), 2 },
                    { 3, new DateTime(2024, 6, 27, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(580), 4, new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(580), 3 },
                    { 4, new DateTime(2024, 6, 27, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(600), 5, new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(600), 4 },
                    { 5, new DateTime(2024, 6, 27, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(630), 1, new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(620), 5 }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "PostId", "TagName" },
                values: new object[,]
                {
                    { 1, null, "Tag 1" },
                    { 2, null, "Tag 2" },
                    { 3, null, "Tag 3" },
                    { 4, null, "Tag 4" },
                    { 5, null, "Tag 5" }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "CreationDate", "HeaderImage", "IsApproved", "PublicationDate", "Title", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, "Content for Post 1", new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9530), "https://via.placeholder.com/150", true, new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9690), "Post 1", 1 },
                    { 2, 2, "Content for Post 2", new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9710), "https://via.placeholder.com/150", true, new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9740), "Post 2", 2 },
                    { 3, 3, "Content for Post 3", new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9770), "https://via.placeholder.com/150", true, new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9780), "Post 3", 3 },
                    { 4, 4, "Content for Post 4", new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9790), "https://via.placeholder.com/150", true, new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9800), "Post 4", 4 },
                    { 5, 5, "Content for Post 5", new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9810), "https://via.placeholder.com/150", true, new DateTime(2024, 5, 28, 15, 29, 40, 765, DateTimeKind.Local).AddTicks(9820), "Post 5", 5 }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Content", "DateOfComment", "PostId", "Subject", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "Comment 1", new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(150), 1, "Subject 1", 1 },
                    { 2, "Comment 2", new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(170), 2, "Subject 2", 2 },
                    { 3, "Comment 3", new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(190), 3, "Subject 3", 3 },
                    { 4, "Comment 4", new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(200), 4, "Subject 4", 4 },
                    { 5, "Comment 5", new DateTime(2024, 5, 28, 15, 29, 40, 766, DateTimeKind.Local).AddTicks(220), 5, "Subject 5", 5 }
                });

            migrationBuilder.InsertData(
                table: "Reactions",
                columns: new[] { "Id", "Image", "Name", "PostId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "https://via.placeholder.com/150", "Reaction 1", 1, 1 },
                    { 2, "https://via.placeholder.com/150", "Reaction 2", 2, 2 },
                    { 3, "https://via.placeholder.com/150", "Reaction 3", 3, 3 },
                    { 4, "https://via.placeholder.com/150", "Reaction 4", 4, 4 },
                    { 5, "https://via.placeholder.com/150", "Reaction 5", 5, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserProfileId",
                table: "Comments",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CategoryId",
                table: "Posts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserProfileId",
                table: "Posts",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Reactions_PostId",
                table: "Reactions",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Reactions_UserProfileId",
                table: "Reactions",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_FollowedUserId",
                table: "Subscriptions",
                column: "FollowedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserProfileId",
                table: "Subscriptions",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_PostId",
                table: "Tags",
                column: "PostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Reactions");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cbbb3769-32e2-4b2f-b618-f1d95536d738", "AQAAAAIAAYagAAAAED1GQLb2jCnWZbRnqzb7pf1iQlAHi7GFDk2hTT+9Dq9XHK2U0jDoUGXWOSvS2eVMQg==", "10074567-a47a-41be-8b41-013acba9dcf4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a1ba67dc-9917-4780-83e3-69350e344d5d", "AQAAAAIAAYagAAAAEDB2ey2J4fzFv7qUwdauv9o5QdWiVXxhEknmQ6BP53y/z+nRgTuYRefuhMVMj8tPzw==", "22309990-7b2e-45a6-bbd6-64efe85d1e99" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "116b2bf8-de16-49c8-8666-bf06ac7de23e", "AQAAAAIAAYagAAAAEAfJYezuPmqRuc816ixdHdgU3PX3AC2W4HCFBZpDYPbkYuodaSf9sKNbukfJfXxeTQ==", "acc471a6-7a82-4c59-9a15-59917c81b5c6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "74690094-401c-4713-8ef4-7357d0c9720b", "AQAAAAIAAYagAAAAEHDo6CIZMRKfOYjYuGuK3y92Zss+SPapYsxWRGjMwL26yReMuEGYJdCxcG+x6Y5lng==", "14e8c273-95e5-4082-8cc7-aad9bedd02f5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4f3a8bc7-a840-41d6-95ca-9ca1186278a0", "AQAAAAIAAYagAAAAEPehB9Z+fg1EtqSXhvl/YOCEKcSqNoZNBpkSfnWO97Q3gJrwoQZjoE4cAq5jNU3MSQ==", "4f7fa052-5625-4932-9c7a-3bee70f0364f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "71993a19-63eb-4fe0-96f9-0fb196c3dee0", "AQAAAAIAAYagAAAAEN+DmB1NVu37nwUadFXap7bS8POnTexAOz7avVxwNXDopo+hWSLsOQkHun4OMkohNw==", "1ae19342-917f-4956-b288-a77c8d647691" });
        }
    }
}
